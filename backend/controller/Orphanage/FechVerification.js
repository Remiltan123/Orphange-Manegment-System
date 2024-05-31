const Verifications = require("../../models/OrphangeModels/VerifyDonation")

const FeachVerifications = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        const response = await Verifications.find({Or_id: id });
        res.send(response)
        
        
    } catch(err) {
        console.error("Error occurred:", err);
        res.json({ success: false, message: "Error occurred while fetching Verification Detial. please try again later" });
    }
}

module.exports = FeachVerifications