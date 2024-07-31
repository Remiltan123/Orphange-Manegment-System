const mongoose = require("mongoose")

const Adopted = mongoose.model("Adopted",{
    Ch_id:{
        type:Number,
        required:true,
    },
    Ad_id:{
        type:Number,
        required:true,
    },
    
    Requested_date:{
        type:Date,
        default:Date.now()
    },
    Accept:{
        type:Boolean,
        default:false
    }
})

module.exports = Adopted;