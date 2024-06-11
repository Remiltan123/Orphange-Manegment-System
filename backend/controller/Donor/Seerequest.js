const Do_Request = require("../../models/Donation")
const Orphanage = require("../../models/Orphanage")
const express = require("express")
const router = express.Router()
const path = require("path");

router.post("/DistrictWiswSearch", async(req,res)=>{
    try{
        const district = req.body.Odistrict;
        const findorphange = await Orphanage.find({ Odistrict:district}) 
        if(findorphange.length===0){
            res.json({success:false, message:"No Any Orphange in " + district})
        }else{
            const OrphangeIds = findorphange.map(orphange=>orphange.Oid)
            let Allorrequest = await Do_Request.find({ Or_id: { $in:OrphangeIds } });
            res.json({ success: true, data: Allorrequest });
        } 
    }
    catch (error) {
        console.error("Error fetching donation requests:", error);
        res.json({ success: false, message: "An error occurred while fetching donation requests." });
    }
   
})

router.post("/SerachPerticularOrphange",async(req,res)=>{
    try{
        const Oname = req.body.Oname;
        const Orphage = await Orphanage.findOne({Oname:Oname})
        if(!Orphage){
            res.json({success:false, message:"An error occur. Please try agian"})
        }else{
            const Request = await Do_Request.find({Or_id:Orphage.Oid})
            if(Request.length===0){
                res.json({success:false, message:"Not Found Requested Within " +Oname }) 
            }else{
                res.json({
                    success:true,
                    data:Request,
                })
            }
        }

    }catch(err){
        console.error("Error"+ err)
        res.json({succes:false ,message:err})
    }
    
})

module.exports = router