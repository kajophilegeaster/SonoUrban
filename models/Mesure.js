const mongoose=require('mongoose')
const mesureSchema = new mongoose.Schema({
    capteur_id:{
        type: String,
        required: true
    },
    localisation:{
        type:String,
        required:true
    },
    decibels:{
        type:Number,
        required:true
    },
    timestamp:{
        type:Date,
       default: Date.now 
    }
})
module.exports=mongoose.model('Mesure',mesureSchema)

