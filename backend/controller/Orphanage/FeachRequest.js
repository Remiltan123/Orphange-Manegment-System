const Do_Request = require("../../models/Donation");

const FeatchAllrequst = async(req,res)=>{
    let orphanageid = req.body.Or_id;
    const request = await Do_Request.find({Or_id:orphanageid})
    if(!request ){
        res.json({success: false, message: "No Requst found in your Orphange"})
    }else{
        res.send(request)
    }
}

module.exports = FeatchAllrequst