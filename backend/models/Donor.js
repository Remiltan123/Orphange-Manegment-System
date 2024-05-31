const mongoose = require("mongoose");

const Donors = mongoose.model("Donors",{
    Do_id:{
      type:Number,
      required: true

    },
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String
      },
    create_date:{
        type:Date,
        default:Date.now,
    },
    verified: Boolean

})

module.exports = Donors