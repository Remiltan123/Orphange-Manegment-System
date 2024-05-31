const mongoose = require("mongoose");

const Orphanage = mongoose.model("Orphanage",{
    Oid: {
        type: Number,
        required: true
    },
    Oname:{
        type:String,
        required: true
    },
    Oaddress:{
        type:String,
        required: true
    },
    Oadmin_name:{
        type:String,
        required: true
    },
    Opassword:{
        type:String,
        required: true
    },
    Omoboile_no:{
        type:Number, // Corrected the type to Number
        required: true
    },
    Omail:{
        type:String,
        required: true
    },
    Odistrict:{
        type:String,
        required: true
    },
    verified: Boolean
});

module.exports = Orphanage
