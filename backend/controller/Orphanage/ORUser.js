const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
require('dotenv').config();
const Orphanage = require("../../models/Orphanage")
const OrphanageVerification = require("../../models/Verificationmodel");
const { default: mongoose } = require('mongoose');
const { appendFile } = require('fs');
const htmlfile = path.join(__dirname, "../../Views/verify.html");
const arrgentwants = require("../../models/ArgentWants")


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "orphanagegroup09@gmail.com",
        pass: "jfhv wioi uoob rcls",
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready for orphanage messages");
    }
});

// Add orphanage
router.post("/Addorphanage", async (req, res) => {
    try {
        const orphanages_indb = await Orphanage.find({});
        let id;
    
        if (orphanages_indb.length > 0) {
            const lastOrphanage = orphanages_indb[orphanages_indb.length - 1];
            id = lastOrphanage.Oid + 1;
        } else {
            id = 1; 
        }

       
        const { Oname, Oaddress, Oadmin_name,  Opassword, Omoboile_no, Omail, Odistrict } = req.body;

        if (!Oname || !Oaddress || !Oadmin_name || !Opassword || !Omoboile_no || !Omail || !Odistrict) {
            return res.json({ success: false, message: "Empty input fields!" });
        }

        if (!/^[a-zA-Z\s]+$/.test(Oadmin_name)) {
            return res.json({ success: false, message: "Invalid name entered!" });
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Omail)) {
            return res.json({ success: false, message: "Invalid email entered!" });
        }

        if (Opassword.length < 6) {
            return res.json({ success: false, message: "Password is too short!" });
        }

        if (Omoboile_no.toString().length !== 11) {
            return res.json({ success: false, message: "Wrong Mobile number" });
        }

        if (!/^[a-zA-Z\s]+$/.test(Odistrict)) {
            return res.json({ success: false, message: "Invalid district entered!" });
        }

        const existingUser = await Orphanage.findOne({ Omail });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Existing user found with the same email address!" });
        }

        const hashedPassword = await bcrypt.hash(Opassword, 10);

        const newOrphanage = new Orphanage({
            Oid:id,
            Oname,
            Oaddress,
            Oadmin_name,
            Opassword: hashedPassword,
            Omoboile_no,
            Omail,
            Odistrict,
            verified: true
        });

        const result = await newOrphanage.save();
        res.json({
            success:true,
            message:"Verification email sent. Check your inbox"
        })

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, message: "An error occurred while saving the user account!" });
    }
});

//   sendVerification(result, res);

const sendVerification = ({ _id, Omail }, res) => {
    const currentUrl = "http://localhost:1010/";
    const uniqueString = uuidv4() + _id;

    const mailOptions = {
        from: "orphanagegroup09@gmail.com",
        to: Omail,
        subject: "Verify your Email",
        html: `<p>Verify your Email address to complete the Registration.</p> <p>This Link <b>expires in 5 hours.</b></p> <p>Press <a href=${currentUrl + "verify/" + _id + "/" + uniqueString}>here</a> to proceed.</p>`,
    };

    const saltRounds = 10;
    bcrypt.hash(uniqueString, saltRounds)
        .then(hashUniqueString => {
            const newVerification = new OrphanageVerification({
                userId: _id,
                uniqueString: hashUniqueString,
                createdAt: Date.now(),
                expiresAt: Date.now() + 18000000,
            });

            newVerification.save()
                .then(() => {
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                            return res.json({ success: false, message: "Verification email failed" });
                        }
                        console.log('Email sent: ' + info.response);
                        res.json({ success: true, message: "Verification email sent. Check your inbox" });
                    });
                })
                .catch(err => {
                    res.status(500).json({ success: false, message: "Couldn't save email verification data!" });
                });

        })
        .catch(err => {
            res.status(500).json({ success: false, message: "An error occurred while hashing email details" });
        });
}

router.get("/verify/:userId/:uniqueString", async (req, res) => {
    const { userId, uniqueString } = req.params;

    try {
        const result = await OrphanageVerification.findOne({ userId });
        if (!result) {
            let message = "Account record doesn't exist or has been verified already. Please sign up or log in.";
            return res.redirect(`/verified?error=true&message=${message}`);
        }

        const { expiresAt, uniqueString: hashedUniqueString } = result;
        if (expiresAt < Date.now()) {
            await OrphanageVerification.deleteOne({ userId });
            await Orphanage.deleteOne({ _id: userId });
            let message = "Link has expired. Please sign up again.";
            return res.redirect(`/verified?error=true&message=${message}`);
        }

        const isMatch = await bcrypt.compare(uniqueString, hashedUniqueString);
        if (!isMatch) {
            let message = "Invalid verification details passed. Check your inbox.";
            return res.redirect(`/verified?error=true&message=${message}`);
        }

        await Orphanage.updateOne({ _id: userId }, { verified: true });
        await OrphanageVerification.deleteOne({ userId });
        res.sendFile(htmlfile);

    } catch (err) {
        console.log(err);
        let message = "An error occurred while checking for existing user verification record.";
        res.redirect(`/verified?error=true&message=${message}`);
    }
});

router.get("/verified", (req, res) => {
    res.sendFile(htmlfile);
});


router.post("/login", async (req, res) => {
    const { Omail, Opassword } = req.body;

    if (Omail === "" || Opassword === "") {
        return res.json({ success: false, message: "Empty input fields!" });
    }

    try {
        const orphanage = await Orphanage.findOne({ Omail });
        if (!orphanage) {
            return res.json({ success: false, message: "Invalid user entered. Please sign up." });
        }
        else if(!orphanage.verified){
            return res.json({ success: false, message: "Email has't verified. check your inbox" });
        }
        else{
            
            const isMatch = await bcrypt.compare(Opassword, orphanage.Opassword);
            if (isMatch) {
                res.json({ success: true, message: "Login Successfully", data:orphanage.Oname });
            } else {
                res.json({ success: false, message: "Invalid password!" });
        }
        }

    } catch (err) {
        console.error("Error:", err);
        res.json({ success: false, message: "An error occurred while logging in." });
    }
});



router.get("/Logout",(req,res)=>{
    try{
        res.clearCookie("token")
        return res.json({ success:true, message: "Logout Succesfully" });

    }catch(err){
        console.log(err)
        return res.json({ success: false, message: err });
    }
})



router.post("/Update/:id", async (req, res) => {
    const { Oname, Oaddress, Oadmin_name, Omoboile_no, Omail, Odistrict } = req.body;
    const { id } = req.params;

    if (!Oname || !Oaddress || !Oadmin_name || !Omoboile_no || !Omail || !Odistrict) {
        return res.json({ success: false, message: "Empty input fields!" });
    }

    if (!/^[a-zA-Z\s]+$/.test(Oadmin_name)) {
        return res.json({ success: false, message: "Invalid name entered!" });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Omail)) {
        return res.json({ success: false, message: "Invalid email entered!" });
    }

    if (Omoboile_no.toString().length !== 11) {
        return res.json({ success: false, message: "Wrong Mobile number" });
    }

    if (!/^[a-zA-Z\s]+$/.test(Odistrict)) {
        return res.json({ success: false, message: "Invalid district entered!" });
    }

    try {
        const response = await Orphanage.findOneAndUpdate(
            { Oid: id }, 
            {
                Oname: Oname,
                Oaddress: Oaddress,
                Oadmin_name: Oadmin_name,
                Omoboile_no: Omoboile_no,
                Omail: Omail,
                Odistrict: Odistrict
            },
            { new: true } // This option returns the updated document
        );

        if (!response) {
            res.json({ success: false, message: "An error occurred finding the orphanage. Please try again." });
        } else {
            res.json({ success: true, message: "Updated successfully.", data: response });
        }
    } catch (error) {
        console.error('Error:', error);
        res.json({ success: false, message: "An error occurred. Please try again later." });
    }
});


router.get("/Logout",(req,res)=>{
    try{
        res.clearCookie("token")
        return res.json({ success:true, message: "Logout Succesfully" });

    }catch(err){
        console.log(err)
        return res.json({ success: false, message: err });
    }
})



router.post("/displayOrphange",async(req,res)=>{
    const district = req.body.Odistrict;
    let Allorphanage = await Orphanage.find({Odistrict:district})
    let CountOrphange = await Orphanage.countDocuments({Odistrict:district})
    if (Allorphanage.length === 0){
        res.json({success:false, message:"No Any Orphange in " + district})
    }else{
        res.send({success:true , data:Allorphanage, count:CountOrphange}) 
    }
    
})

router.get("/GetArgentWants",async(req,res)=>{
    try{
        const response = await arrgentwants.find({})
        if(!response){
            res.json({success:false,message:"No any request not find"})
        }else{
            res.json({success:true,data:response})
        }
    }catch(err){
        console.error("Error:",err)
        res.json({success:false,message:"An error occur while Featching data"})
    }
   
})



//Wants Donetion
router.post("/WantsDonetion", async (req, res) => {

    const fullName = req.body.fullName;
    const email = req.body.email;
    const cardno = req.body.cardno;
    const month = req.body.month;
    const code = req.body.code;
    const amount = req.body.amount;
    const _id = req.body._id;

    // Check for empty fields
    if (!fullName || !email || !cardno || !month || !code) {
        return res.json({ success: false, message: "Empty input fields!" });
    }

    // Check for valid name
    if (!/^[a-zA-Z\s]+$/.test(fullName)) {
        return res.json({ success: false, message: "Invalid name entered!" });
    }

    // Check for valid email
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.json({ success: false, message: "Invalid email entered!" });
    }

    // Check for valid card number (basic Luhn algorithm check could be added here)
    if (!/^\d{16}$/.test(cardno)) {
        return res.json({ success: false, message: "Invalid card number entered!" });
    }

    // Check for valid expiration date (MM/YYYY)
    if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(month)) {
        return res.json({ success: false, message: "Invalid expiration date entered!" });
    }

    // Check for valid security code (CVV)
    if (!/^\d{3,4}$/.test(code)) {
        return res.json({ success: false, message: "Invalid security code entered!" });
    }

    
    try {

        const response = await arrgentwants.findByIdAndUpdate( _id,{ $inc:{Raised_amount:amount}},{ new: true } )
        if(!response){
            res.json({succes:false, message:"Document not found."})
        }else{
            res.json({ success: true, message: "Donation successful.", updatedDocument: response });
        }
       
    } catch (error) {
        console.error("Error processing donation:", error);
        res.status(500).json({ success: false, message: "Internal server error." });
    }
});



module.exports = router;
