const express = require('express')
const router = express.Router()
const Mesure = require('../models/Mesure')
const Alerte = require('../models/Alerte')
const {validerMesure}=require('../middlewares/validation')

const SEUIL_MODERE= 60
const SEUIL_DANGER=70

//Route 1: recevoir une mesure depuis l'ESP32
router.post('/', validerMesure, async (req,res) =>{
    try{
        const mesure=new Mesure(req.body)
        await mesure.save()
        // verifier le niveau sonore
        if (mesure.decibels >= SEUIL_MODERE){
            const niveau = mesure.decibels >= SEUIL_DANGER 
                 ? 'danger'
                 :'modere'
                const alerte =new Alerte({
                    capteur_id: mesure.capteur_id,
                    localisation: mesure.localisation,
                    decibels: mesure.decibels,
                    niveau
                })
            await alerte.save()     
        }
        res.status(201).json({message:'Mesure enregistree',mesure})
    }catch(err){
        res.status(400).json({erreur: err.message})
    }
})

//Route 2:Recuperer et lire toutes les mesures
router.get('/',async(req ,res)=>{
    try{
        const mesures =await Mesure.find().sort({timestamp:-1}) 
        res.json(mesures)
    }catch(err){
        res.status(500).json({erreur: err.message})
    }
})
// Route 3: Recuperer et lire  par capteur
router.get('/capteur/:capteur_id', async(req, res)=>{
    try{
        const mesures=await Mesure.find({ capteur_id: req.params.capteur_id}).sort({timestamp:-1 })
        if (mesures.lenght===0){
            return res.statuts(404).json({
                erreur:'Aucune mesure trouvee pour ce capteur'
            })
        }
        res.json(mesures)
    }
    catch(err){
        res.status(500).json({erreur:err.message})
    }
})
// router.get('/', async (req, res) => {
//   try {
//     const dixMinutes = new Date(Date.now() - 10 * 60 * 1000)
    
//     const mesures = await Mesure.find({
//       timestamp: { $gte: dixMinutes }
//     })
//     .sort({ timestamp: -1 })
//     .limit(100)
    
//     res.json(mesures)
//   } catch (err) {
//     res.status(500).json({ erreur: err.message })
//   }
// })

// Route 4- lire par periode
router.get('/periode',async (req ,res) =>{
    try{
        const {debut , fin}=req.query
        if(!debut || !fin){
            return res.status(400).json({
                erreur:'fournir debut et fin .'//ex: /debut=2026-04-01 & fin=2026-04-11
            })
        }
        const mesures = await Mesure.find({
            timestamp:{
                $gte:new Date(debut),
                $lte: new Date(fin)
            }
        }).sort({timestamp: -1})
        if(mesures.length===0){
            return res.status(404).json({
                erreur:'aucune mesure trouvee pour cette periode'
            })
        }
        res.json(mesures)
    }catch(err){
        res.status(500).json({erreur:err.message})
    }
})

//Route 5-supprimer une mesure
router.delete('/:id',async(req,res)=>{
    try{
        const mesure =await Mesure.findByIdAndDelete(req.params.id)
        if(!mesure) {
            return res.status(404).json({
                erreur:'Mesure introuvable'
            })
        }
        res.json({message:'mesure supprimee',mesure})
    }catch(err){
        res.status(500).json({erreur:err.message})
    }
})

module.exports =router //rendre router disponible pour app.js