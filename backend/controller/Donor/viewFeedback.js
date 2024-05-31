const Feedback = require("../../models/OrphangeModels/FeedBack");
const jwt = require('jsonwebtoken');

const ViewFeedback = async (req, res) => {
    try {
        let token = req.params.token;
        const decoded = jwt.verify(token,process.env.KEY)
        let id = decoded.id
        const response = await Feedback.find({ Donor_id: id });
        
        if (response.length === 0) {
            res.status(500).json({ success: false, message: "No feedback given by any Orphanage" });
        } else {
            res.send(response);
        }
       
    } catch(err) {
        console.error("Error occurred:", err);
        res.json({ success: false, message: "Error occurred while fetching feedback" });
    }
}

module.exports = ViewFeedback;
