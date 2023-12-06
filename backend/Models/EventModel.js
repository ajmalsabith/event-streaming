const { url } = require('inspector')
const mongoose = require('mongoose')

const eventSCheema= new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"upcoming"
    },
    startdate:{
        type:Date,
        required:true
    },
    enddate:{
        type:Date,
        required:true
    },
    eventurl:{
        type:String,
        required:true
    }
})

module.exports= mongoose.model('Events',eventSCheema)