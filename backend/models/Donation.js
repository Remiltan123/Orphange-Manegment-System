
const mongoose = require("mongoose")

const Do_Request = mongoose.model("Do_Request",{
    Or_id:{
        type:Number,
        required: true
    },
    Re_id:{
        type:Number,
        required: true
    },
    purpose:{
        type:String,
        required: true
    },
    expect_amount:{
        type:Number,
    },
    description:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

module.exports = Do_Request