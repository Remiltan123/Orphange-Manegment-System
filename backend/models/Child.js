const mongoose = require("mongoose");

const Chlids = mongoose.model("Childs",{
    id:{
        type:Number,
        required:true
    },
    OR_id:{
        type:Number,
        required:true,
    },
    Name:{
        type:String,
        required:true,
    },
    Age:{
        type:Number,
        required:true,
    },
    Gender:{
        type:String,
        required:true,
    },
    Diaseases:{
        type:String,
        required:true,
    },
    Specialneed:{
        type:String,
        required:true,
    },
    Available:{
        type:Boolean,
        default:true,
    },
    Add_Date:{
        type:Date,
        default:Date.now(),
    }

})

module.exports = Chlids;
