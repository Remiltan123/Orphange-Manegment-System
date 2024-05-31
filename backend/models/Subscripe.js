const mongoose = require("mongoose")

const Subscripe = mongoose.model("Subscripe",{
    email:{
        type:String,
        required:true
    }
})

module.exports = Subscripe