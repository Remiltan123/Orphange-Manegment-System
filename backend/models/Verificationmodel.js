const mongoose = require("mongoose");

const Verification = mongoose.model("Verifications",{
    userId:String,
    uniqueString:String,
    createdAt:Date,
    expiresAt:Date,
})

module.exports = Verification