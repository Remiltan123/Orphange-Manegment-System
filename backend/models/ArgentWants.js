
const mongoose = require("mongoose")

const ArrgentWants = mongoose.model("ArrgentWants ",{
    Or_id:{
        type:Number,
        required: true
    },
    purpose:{
        type:String,
        required: true
    },
    goal_amount:{
        type:Number,
    },
    Raised_amount:{
        type:Number,
    },
    description:{
        type:String,
    },
    image:{
        type: String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

module.exports = ArrgentWants;