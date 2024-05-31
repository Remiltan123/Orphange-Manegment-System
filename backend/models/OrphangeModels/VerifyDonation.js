const mongoose = require("mongoose")

const Verify_Donetions = mongoose.model("Verify_Donetions",{
    Donor_id:{
        type:Number,
        required:true
    },
    Doneted_Date:{
        type:Date,
        required:true
    },
    Verify:{
        type:String,
        required:true
    },
    Or_id:{
        type:Number,
        required:true
    },
    Verifyed_Date:{
        type:Date,
        default:Date.now()
    },
    
})

module.exports = Verify_Donetions