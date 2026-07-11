const mongoose =require('mongoose')
const alerteSchema =new mongoose.Schema({
    capteur_id:{
        type: String,
        required:true
    },
    localisation:{
        type:String,
        required: true
    },
    decibels:{
        type:Number,
        required:true
    },
    niveau:{
        type:String,
        enum:['modere','danger'],
        required:true
    },
    lue:{
        type:Date,
        defauld:Date.now
    }
})
module.exports=mongoose.model('Alerte',alerteSchema)