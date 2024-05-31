const Verifications = require("../../models/OrphangeModels/VerifyDonation")
const jwt = require('jsonwebtoken');

const Viewerifications = async (req, res) => {
    try {
        let token = req.params.token
        const decoded = jwt.verify(token,process.env.KEY)
        let id =  decoded.id

        const response = await Verifications.find({ Donor_id: id });
        if (response.length === 0) {
            res.status(500).json({ success: false, message: "No Verificaton detilas found about You" });
        } else {
            res.send(response);
        }
       
    } catch(err) {
        console.error("Error occurred:", err);
        res.json({ success: false, message: "Error occurred while fetching feedback" });
    }
}

module.exports = Viewerifications;