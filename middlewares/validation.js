const validerMesure = (req ,res , next)=>{
    let{capteur_id, localisation ,decibels}=req.body

    decibels = Number(decibels)

    //verifie que les champs existent
    if (!capteur_id || !localisation || !decibels){
        return res.status(400).json({
            erreur: 'Champs manquants: capteur_id,localisation et dcibels sont obligatoires'
        })
    }
    //verifie que le capteur_id est un texte
    if(typeof capteur_id !== 'string'){
        return res.status(400).json({
            erreur:' capteur_id doit etre un texte'
        })
    }
    //verifie que decibels est un nombre
    if (isNaN(decibels)){
        return res.status(400).json({
             erreur :'decibels doit etre un nombre'
        })
    }
    //verifie que decibles soit compris entre 0et 200
    if (decibels<0 || decibels>200){
        return res.status(400).json({
            erreur:'les decibels doivent etre compris entre 0 et 200'
        })
    }
    //Des que tout est correct
    next()
    
}
module.exports={validerMesure}