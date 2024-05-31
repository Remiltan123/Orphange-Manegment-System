const Do_Request = require("../../models/Donation")
const Orphanage = require("../../models/Orphanage")

const AllDonationRequest = async (req,res)=>{
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
   
}

module.exports = AllDonationRequest