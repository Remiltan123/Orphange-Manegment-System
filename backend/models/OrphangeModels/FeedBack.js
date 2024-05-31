const mongoose = require("mongoose")

const Feedback = mongoose.model("Feedback",{
    Donor_id:{
        type:Number,
        required:true
    },
    DO_name:{
        type:String,
        required:true
    },
    OR_name:{
        type:String,
        required:true
    },
    purpose:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        required:true
    },
    Donated_Date:{
        type: Date,
        required: true 
    },
    Date:{
        type:Date,
        default:Date.now
    }


})

module.exports=Feedback