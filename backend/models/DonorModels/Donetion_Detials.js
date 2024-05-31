const mongoose = require("mongoose")

const Do_Details = mongoose.model("Do_Details",{
    Do_id:{
        type:String,
        required:true
    },
    Oname:{
        type:String,
        required:true
    },
    purpose:{
        type:String,
        required: true
    },
    Do_name:{
        type:String,
        required: true
    },
    Do_email:{
        type:String,
     
    },
    amount:{
        type:String,
        required: true

    },
    card_No:{
        type:String,
        required: true
    },
    CCV:{
        type:String,
        required: true
    },
    Do_Date:{
        type:Date,
        default:Date.now
    }
}) 

module.exports = Do_Details