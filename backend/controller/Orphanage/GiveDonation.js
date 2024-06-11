const Do_Request = require("../../models/Donation");

const GiveDonation = async (req, res) => {
    try {
        let id;
        const findallrequest = await Do_Request.find({});
        if (findallrequest.length > 0) {
            id = findallrequest[findallrequest.length - 1].Re_id + 1;
        } else {
            id = 1;
        }

        const NewDo_Request = new Do_Request({
            Or_id: req.body.Or_id,
            Re_id: id,
            purpose: req.body.purpose,
            expect_amount:req.body.expect_amount,
            raised_amount:0,
            description: req.body.description
        });

        
        await NewDo_Request.save();
        res.json({
            success: true,
            message:"Request added succesfully"
        });

    } catch (err) {
        console.error(err); // Log the error
        res.status(500).json({ success: false , message: "Error occurred while saving the Donation request" });
    }
};

module.exports = GiveDonation;  
