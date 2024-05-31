const moongoose = require("mongoose")

const Adopeters = moongoose.model("Adopeters",{
    Aid:{
        type:Number,
        required: true
    },
    Aname:{
        type:String,
        required: true
    },
    married:{
        type:String,
        
    },
    address:{
        type:String,
        required: true
    },
    mobile_no:{
        type:String,
        required: true
    },
    email:{
        type:String,
        unique:true,
        required: true
    },
    password:{
        type:String,
        required: true
      },
    verified: Boolean,
    create_date:{
        type:Date,
        default:Date.now,
    },
   
    
})

module.exports= Adopeters 