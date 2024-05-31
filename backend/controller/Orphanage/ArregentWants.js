
const ArrgentWants = require("../../models/ArgentWants")

const AddArregentWants = async(req, res) => {

    const { Or_id,purpose, goal_amount, Raised_amount, description, image } = req.body;
   

    // Validate input fields
    if (!purpose || !goal_amount || !Raised_amount || !description || !image) {
        return res.json({ success: false, message: "Empty input field!" });
    }

    // Create new urgent want
    const NewArrgentWant = new ArrgentWants({
        Or_id:Or_id,
        purpose: purpose,
        goal_amount: goal_amount,
        Raised_amount: Raised_amount,
        description: description,
        image: image,
    });

    try {
       
        const response = await NewArrgentWant.save();
        if (!response) {
            return res.json({ success: false, message: "An error occurred while saving the data." });
        } else {
            return res.json({ success: true, message: "Added Successfully." });
        }
    } catch (err) {
        console.error("Error:", err);
        return res.json({ success: false, message: "An error occurred while saving the data." });
    }
}

module.exports = AddArregentWants;
