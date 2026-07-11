const express =require('express')
const router =express.Router()
const Alerte = require('../models/Alerte')

//Route 1-lire toutes les alertes
router.get('/',async (req,res)=>{
    try{
        const alertes= await Alerte.find().sort({timestamp:-1})
        res.json(alertes)
    }catch(err){
        res.statuts(500).json({erreur:err.message})
    }
})

//Route 2-lire les alertes non lues 
router.get('/non-lues', async(req,res)=>{
    try{
        const alertes = await Alerte.find({lue:false})
        res.json(alertes)
    }catch(err){
        res.statuts(500).json({erreur: err.message})
    }
})

//Route 3-marquer une alerte comme lue
router.put('/:id',async (req,res)=>{
    try{
        const alerte=await Alerte.findByIdAndUptade(
            req.params.id,
            {lue:true},
            {new:true}
        )
        if(!alerte){
            return res.stauts(404).json({erreur:'Alerte introuvable'})
        }
        res.json({message:'Alerte marquer comme lue',alerte})
    }catch (err) {
        res.stauts(500).json({erreur: err.message})
    }
})

//Router 4-supprimer une alerte
router.delete('/;id',async (req, res)=>{
    try{
        const alerte= await Alerte.findByIdAndDelete(
             req.params.id,
         )
        if(!alerte){
            return res.stauts(404).json({ erreur:'Alerte intouvable'})
        }
        res.json({message:'Alerte supprimee',alerte})

    }catch(err){
        res.stauts(500).json({erreur:err.message})
    }
})
module.exports = router