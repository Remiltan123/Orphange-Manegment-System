const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
require('dotenv').config();
const AdopterVerification = require("../../models/Verificationmodel");
const { default: mongoose } = require('mongoose');
const htmlfile = path.join(__dirname, "../../Views/verify.html");
const Adopters = require("../../models/Adopter");



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

router.post("/Register", async (req, res) => {
    try {
        let id;
        const findadopter = await Adopters.find({});
        if (findadopter.length > 0) {
            const lastadopter = findadopter[findadopter.length - 1];
            id = lastadopter.Aid + 1;
        } else {
            id = 1;
        }
        const { Aname, address,  password, mobile_no,  email,  married, conpassword } = req.body;

        if (!Aname || !address || !password || !mobile_no || ! email || ! married || !conpassword) {
            return res.json({ success: false, message: "Empty input fields!" });
        }

        if (!/^[a-zA-Z\s]+$/.test(Aname)) {
            return res.json({ success: false, message: "Invalid name entered!" });
        }

        if(password != conpassword){
            return res.json({ success: false, message: "Your conform password failed. please give correct password!" });
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            return res.json({ success: false, message: "Invalid email entered!" });
        }

        if (password.length < 6) {
            return res.json({ success: false, message: "Password is too short!" });
        }

        if (mobile_no.toString().length !== 11) {
            return res.json({ success: false, message: "Wrong Mobile number" });
        }


        const existingUser = await Adopters.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "Existing user found with the same email address!" });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newAdopter = new Adopters({
            Aid: id,
            Aname ,
            address,
            password: hashedPassword,
            mobile_no,
            email,
            married,
            verified:true
        });

        const result = await newAdopter.save()
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

const sendVerification = ({ _id, email }, res) => {
    const currentUrl = "http://localhost:1010/";
    const uniqueString = uuidv4() + _id;

    const mailOptions = {
        from: "orphanagegroup09@gmail.com",
        to: email,
        subject: "Verify your Email",
        html: `<p>Verify your Email address to complete the Registration.</p> <p>This Link <b>expires in 5 hours.</b></p> <p>Press <a href=${currentUrl + "verify/" + _id + "/" + uniqueString}>here</a> to proceed.</p>`,
    };

    const saltRounds = 10;
    bcrypt.hash(uniqueString, saltRounds)
        .then(hashUniqueString => {
            const newVerification = new AdopterVerification ({
                userId: _id,
                uniqueString: hashUniqueString,
                createdAt: Date.now(),
                expiresAt: Date.now() + 60000,
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


router.get("/verify/:userId/:uniqueString", (req, res) => {
    const { userId, uniqueString } = req.params;

    AdopterVerification.findOne({ userId })
        .then(result => {
            if (result) {
                const { expiresAt, uniqueString: hashedUniqueString } = result;

                if (expiresAt < Date.now()) {
                    AdopterVerification.deleteOne({ userId })
                        .then(() => {
                            Adopters.deleteOne({ _id: userId })
                                .then(() => {
                                    let message = "Link has expired. Please sign up again.";
                                    res.redirect(`/verified?error=true&message=${message}`);
                                })
                                .catch(err => {
                                    let message = "Clearing user with expired unique string failed!";
                                    res.redirect(`/verified?error=true&message=${message}`);
                                });
                        })
                        .catch(err => {
                            let message = "An error occurred while clearing user verification record";
                            res.redirect(`/verified?error=true&message=${message}`);
                        });
                } else {
                    bcrypt.compare(uniqueString, hashedUniqueString)
                        .then(isMatch => {
                            if (isMatch) {
                                Adopters.updateOne({ _id: userId }, { verified:true })
                                    .then(() => {
                                        AdopterVerification.deleteOne({ userId })
                                            .then(() => {
                                                res.sendFile(htmlfile);
                                            })
                                            .catch(err => {
                                                let message = "An error occurred while finalizing successful verification.";
                                                res.redirect(`/verified?error=true&message=${message}`);
                                            });
                                    })
                                    .catch(err => {
                                        let message = "An error occurred while updating user.";
                                        res.redirect(`/verified?error=true&message=${message}`);
                                    });
                            } else {
                                let message = "Invalid verification details passed. Check your inbox.";
                                res.redirect(`/verified?error=true&message=${message}`);
                            }
                        })
                        .catch(err => {
                            let message = "An error occurred while comparing unique strings.";
                            res.redirect(`/verified?error=true&message=${message}`);
                        });
                }
            } else {
                let message = "Account record doesn't exist or has been verified already. Please sign up or log in.";
                res.redirect(`/verified?error=true&message=${message}`);
            }
        })
        .catch(err => {
            console.log(err);
            let message = "An error occurred while checking for existing user verification record.";
            res.redirect(`/verified?error=true&message=${message}`);
        });
});

// Verify page route
router.get("/verified", (req, res) => {
    res.sendFile(htmlfile);
});



router.post("/Adopterlogin", async (req, res) => {
    const { email, password } = req.body;

    if (email === "" || password === "") {
        return res.json({ success: false, message: "Empty input fields!" });
    }

    try {
        const adopter = await Adopters.findOne({ email });
        if (!adopter) {
            return res.json({ success: false, message: "Invalid user entered. Please sign up." });
        }
        else if(!adopter.verified){
            return res.json({ success: false, message: "Email has't verified. check your inbox" });
        }
        else{
            
            const isMatch = await bcrypt.compare(password, adopter.password);
            if (isMatch) {
                res.json({ success: true, message: "Login Successfully"});
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






module.exports = router;