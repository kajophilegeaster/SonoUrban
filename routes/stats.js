const express = require ('express')
const router = express.Router()
const Mesure = require('../models/Mesure')
const Alerte = require('../models/Alerte')

//Route1-moyenne de decibels sur 24h
router.get('/moyenne',async(req,res)=>{
    try{
        const hier =new Date
        hier.setHours(hier.getHours()-24)
        const resultat = await Mesure.aggregate([
            {
                $match:{
                    timestamp:{$gte:hier}
                }
            },
            {
                $group:{
                    _id:'$capteur_id',
                    moyenne:{ $avg: '$decibels'},
                    total:{$sum: 1}
                }
            }
        ])
        re.json(resultat)
    }catch(err){
        res.status(500).json({erreur: err.message})
    }
})

//Route2-valeur maximum sur unr periode
router.get('/maximum',async(req,res)=>{
    try{
        const{debut,fin}=req.query

        if(!debut || !fin){
            return res.status(400).json({
                erreur:'fournir debut et fin'
            })
        }
        const resultat=await Mesure.aggregate([
            {
                $match:{
                    timestamp:{
                        $gte:new Date(debut),
                        $lte: new Date(fin)
                    }
                }
            },
            {
                $group:{
                    _id: '$capteur_-id',
                    maximum:{$max:'$decibels'},
                    minimum:{$min:'$decibels'},
                    moyenne:{$avg:'$decibels'}
                }
            }
        ])
        res.json(resultat)
    }catch(err){
        res.status(500).json({erreur:err.message})
    }
})

//Route3-Nombre d'alertes par jour 
router.get('/alertes',async (req,res)=>{
    try{
        const resultat=await Alerte.aggregate([
            {
                $group:{
                    _id:{
                        jour: {$dayOfMonth:'$timestamp'},
                        mois: {$month:     '$timestamp'},
                        annee: {$year:     '$timestamp'},
                        niveau: '$niveau'
                    },
                    total:{$sum: 1}
                }
            },
            {
                $sort:{
                    '_id.annee': -1,
                    '_id.mois': -1,
                    '_id.jour': -1
                }
            }
        ])
        res.json(resultat)
    }catch(err){
        res.status(500).json({erreur: err.message})
    }
})

//Route4- comparaison entre capteurs
router.get('/comparaison',async(req,res)=>{
    try{
        const resultat =await Mesure.aggregate([
            {
                $group:{
                    _id: '$capteur_id',
                    moyenne:{$avg: '$decibels'},
                    maximum:{$max: '$decibels'},
                    minimum:{$min: '$decibels'},
                    total:  {$sum: 1}
                }
            },
            {
                $sort:{moyenne: -1}
            }
        ])
        res.json(resultat)
    }catch(err){
        res.status(500).json({erreur:err.message})
    }
})
module.exports= router