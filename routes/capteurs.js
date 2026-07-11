const express=require('express')
const router=express.Router()
const Capteur=require('../models/Capteur')
const {validerMesure}=require('../middlewares/validation')


//Route 1-enregistre un nouveau capteur
router.post('/', async(req,res)=>{
    try{
        const capteur=new Capteur(req.body)
        await capteur.save()
        res.status(201).json({message:'Capteur enregistre',capteur})
    }catch(err){
        res.status(400).json({erreur: err.message})
    }
})
//Route2-lister tous les capteurs
router.get('/', async(req, res)=>{
    try{
        const capteurs =await Capteur.find().sort({timestamp:-1})
        res.json(capteurs)
    }catch(err){
        res.status(500).json({erreur:err.message})
    }
})
// Routes3-voir un capteur precis
router.get('/:id',async(req,res)=>{
    try{
        const capteur = await Capteur.findById(req.params.id)
        if(!capteur){
            return res.status(404).json({
                erreur:'capteur introuvable'
            })
        }
        res.json(capteur)
    }catch(err){
        res.status(500).json({erreur:err.message})
    }
})
//Route4-Modifier la localisation d un capteur
router.put('/:id',async (req,res)=>{
    try{
        const capteur = await Capteur.findByIdAndUpdate(
            req.params.id,
            req.body,  
            {new:true}   
        )
        if (!capteur){
            return res.status(404).json({
                erreur: 'capteur introuvable'
            })
        }
        res.json({message:'capteur modifie',capteur})
    }catch(err){
        res.status(500).json({erreur:err.message})
    }
})
//Route5-supprimer un capteur
router.delete('/', validerMesure, async(req,res)=>{
    try{
        const capteur= await Capteur.findByIdAndDelete(req.params.id)
        if (!capteur){
            return res.status(404).json({
                erruer:'capteur introuvable'
            })
        }
        res.json({message:'capteur supprimepq234',capteur})
    }catch(err){
        res.status(500).json({erreur:err.message})
    }
}) 
module.exports =router