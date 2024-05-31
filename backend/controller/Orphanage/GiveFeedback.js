const Feedback = require("../../models/OrphangeModels/FeedBack");

const GiveFeedBack = async (req, res) => {
    try {
        if (!req.body) {
            throw new Error('Request body is undefined');
        }

        const requiredFields = ['Donor_id', 'DO_name', 'OR_name', 'feedback', "Donated_Date",'purpose'];
        const missingFields = [];

        requiredFields.forEach(field => {
            if (!req.body[field]) {
                missingFields.push(field);
            }
        });

        if (missingFields.length > 0) {
            throw new Error(`One or more fields are missing: ${missingFields.join(', ')}`);
        }
       
        const feedback = new Feedback({
            Donor_id: req.body.Donor_id,
            DO_name: req.body.DO_name,
            OR_name: req.body.OR_name,
            feedback:req.body.feedback,
            Donated_Date:req.body.Donated_Date,
            purpose:req.body.purpose,
        });

        await feedback.save();
        res.json({ success: true, message: "Feedback added successfully" });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ success: false, errors: "Error occurred while saving the data" });
    }
}


module.exports = GiveFeedBack;
