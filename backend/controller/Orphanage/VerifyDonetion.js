const Verify_Donetions = require("../../models/OrphangeModels/VerifyDonation")

const VerifyDonetion = async(req,res)=>{
    try{
        const Verify_Donetion = new Verify_Donetions({
            Donor_id:req.body.Donor_id,
            Doneted_Date:req.body.Doneted_Date,
            Verify:req.body.Verify,
            Or_id:req.body.Or_id
        })
        await Verify_Donetion.save();
        res.json({ success: true, message: "Verified Succesfully." });
    }catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ success: false, errors: "Error occurred while saving the data" });
    }
}

module.exports = VerifyDonetion