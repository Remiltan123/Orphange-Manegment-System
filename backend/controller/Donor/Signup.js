const Donors = require("../../models/Donor");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const DonorSignup = async (req, res) => {
    let id;
    const findallDonors = await Donors.find({});
    if (findallDonors.length > 0) {
        id = findallDonors[findallDonors.length - 1].Do_id + 1;
    } else {
        id = 1;
    }

    const { name, email, password } = req.body;
    const Name = name;
    const Email = email;
    const Password = password;

    if (Email == "" || Password == "" || Name == "") {
        return res.json({ success: false, message: "Empty input fields!" });
    } 

    if (!/^[a-zA-Z]+$/.test(Name)) {
        return res.json({ success: false, message: "Invalid name entered!" });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email)) {
        return res.json({ success: false, message: "Invalid email entered!" });
    }

    if (Password.length < 6) {
        return res.json({ success: false, message: "Password is too short!" });
    }

    try {
        const existingUser = await Donors.findOne({ email: Email });
        if (existingUser) {
            return res.status(400).json({ success: false, errors: "Existing user found with same email address" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(Password, saltRounds);

        const newDonor = new Donors({
            name: Name,
            email: Email,
            password: hashedPassword,
            Do_id: id
        });

        const savedDonor = await newDonor.save();
        res.json({ success: true, message: "Signup Successfully", data: savedDonor });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, errors: "An error occurred while saving user account!" });
    }
};

module.exports = DonorSignup;
