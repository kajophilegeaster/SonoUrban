const mongoose= require('mongoose')
const capteurSchema= new mongoose.Schema({
    capteur_id:{
        type:String,
        required:true
    },
    localisation:{
        type:String,
        required:true
    },
    description:{
        type:String,
        defauld:''
    },
    actif:{
        type: Boolean,
        defauld:true
    },
    timestamp:{
        type:Date,
        defauld:Date.now
    }
})
module.exports=mongoose.model('capteur',capteurSchema)