const Donors = require("../../models/Donor");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const express = require("express");
const router = express.Router();
const DonorsVerification = require("../../models/Verificationmodel");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const htmlfile = path.join(__dirname, "../../Views/verify.html");
require('dotenv').config();


// Mail function
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "orphanagegroup09@gmail.com",
        pass: "jfhv wioi uoob rcls",
    }
});

// Testing success
transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log("Ready for messages");
    }
});

// Signup
router.post('/signup', async (req, res) => {
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

    if (Email === "" || Password === "" || Name === "") {
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
            return res.status(400).json({ success: false, message: "Existing user found with same email address" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(Password, saltRounds);

        const newDonor = new Donors({
            name: Name,
            email: Email,
            password: hashedPassword,
            Do_id: id,
            verified: true
        });

        await newDonor.save()
        res.json({
            success:true,
            message:"Verification email sent. Check your inbox"
        })
        
        
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ success: false, message: "An error occurred while saving user account!" });
    }
});

/*
.then((result)=>{
            sendVerification(result, res);
        })
*/
// Send verification
const sendVerification = ({ _id, email }, res) => {
    const currentUrl = "http://localhost:1010/";

    const uniqueString = uuidv4() + _id;

    const mailOptions = {
        from: "orphanagegroup09@gmail.com",
        to: email,
        subject: "Verify your Email",
        html: `<p>Verify your Email address to complete the signup and login into your account.</p> <p>This Link <b>expires in 5 hours.</b></p> <p>Press <a href=${currentUrl + "user/verify/" + _id + "/" + uniqueString}>here</a> to proceed.</p>`,
    };

    const saltRounds = 10;
    bcrypt.hash(uniqueString, saltRounds)
        .then(hashUniqueString => {
            const newVerification = new DonorsVerification({
                userId: _id,
                uniqueString: hashUniqueString,
                createdAt: Date.now(),
                expiresAt: Date.now() + 18000000,
            });

            newVerification.save()
                .then(() => {
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                            res.json({ success:false, message: "Verification email failed" });
                        } else {
                            console.log('Email sent: ' + info.response);
                            res.json({ success:true, message: "Verification email sent. check your inbox" });
                        }
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

// Verify email
router.get("/verify/:userId/:uniqueString", (req, res) => {
    const { userId, uniqueString } = req.params;

    DonorsVerification.findOne({ userId })
        .then(result => {
            if (result) {
                const { expiresAt, uniqueString: hashedUniqueString } = result;

                if (expiresAt < Date.now()) {
                    DonorsVerification.deleteOne({ userId })
                        .then(() => {
                            Donors.deleteOne({ _id: userId })
                                .then(() => {
                                    let message = "Link has expired. Please sign up again.";
                                    res.redirect(`/user/verified?error=true&message=${message}`);
                                })
                                .catch(err => {
                                    let message = "Clearing user with expired unique string failed!";
                                    res.redirect(`/user/verified?error=true&message=${message}`);
                                });
                        })
                        .catch(err => {
                            let message = "An error occurred while clearing user verification record";
                            res.redirect(`/user/verified?error=true&message=${message}`);
                        });
                } else {
                    bcrypt.compare(uniqueString, hashedUniqueString)
                        .then(isMatch => {
                            if (isMatch) {
                                Donors.updateOne({ _id: userId }, { verified: true })
                                    .then(() => {
                                        DonorsVerification.deleteOne({ userId })
                                            .then(() => {
                                                res.sendFile(htmlfile);
                                            })
                                            .catch(err => {
                                                let message = "An error occurred while finalizing successful verification.";
                                                res.redirect(`/user/verified?error=true&message=${message}`);
                                            });
                                    })
                                    .catch(err => {
                                        let message = "An error occurred while updating user.";
                                        res.redirect(`/user/verified?error=true&message=${message}`);
                                    });
                            } else {
                                let message = "Invalid verification details passed. Check your inbox.";
                                res.redirect(`/user/verified?error=true&message=${message}`);
                            }
                        })
                        .catch(err => {
                            let message = "An error occurred while comparing unique strings.";
                            res.redirect(`/user/verified?error=true&message=${message}`);
                        });
                }
            } else {
                let message = "Account record doesn't exist or has been verified already. Please sign up or log in.";
                res.redirect(`/user/verified?error=true&message=${message}`);
            }
        })
        .catch(err => {
            console.log(err);
            let message = "An error occurred while checking for existing user verification record.";
            res.redirect(`/user/verified?error=true&message=${message}`);
        });
});

// Verify page route
router.get("/verified", (req, res) => {
    res.sendFile(htmlfile);
});

// SignIn
router.post("/Login", async (req, res) => {
    const { email, password } = req.body;

    if (email === "" || password === "") {
        return res.json({ success: false, message: "Empty input fields!" });
    }

    try {
        const donor = await Donors.findOne({ email });
        if (!donor) {
            return res.json({ success: false, message: "Invalid user entered. Please sign up." });
        }
        else if (!donor.verified) {
            return res.json({ success: false, message: "Email hasn't verified. Check your inbox." });
        } else {
            const isMatch = await bcrypt.compare(password, donor.password);
            if (isMatch) {
                const token = jwt.sign(
                    { id: donor.Do_id, name: donor.name },
                    process.env.KEY,
                    { expiresIn: '1h' } // Optional: Set token expiry time
                );
                res.json({ success: true, message: "Login Successfully", token:token });
            } else {
                res.json({ success: false, message: "Invalid password!" });
            }
        }
    } catch (err) {
        console.error("Error:", err);
        res.json({ success: false, message: "An error occurred while logging in." });
    }
});




router.post("/forgotpassword",async(req,res)=>{

    const Email = req.body.email
    if(!Email){
        return res.json({ success: false, message: "Empty input fields!" });
    }
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email)) {
        return res.json({ success: false, message: "Invalid email entered!" });
    }
    else{
        const findDonor = await Donors.findOne({email:Email})
        if(!findDonor){
            return res.json({ success: false, message: "Donor not resister!" });
        }
        else{

            const token = jwt.sign({id:findDonor._id},process.env.KEY,{expiresIn:"5m"}) //authendication user is same

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: "orphanagegroup09@gmail.com",
                  pass: "jfhv wioi uoob rcls",
                }
            });

            let currentUrl = "http://localhost:3000/"

            var mailOptions = {
                from: "orphanagegroup09@gmail.com",
                to: Email,
                subject:"Reset Password",
                html: `<p>Verify your Email address to change the password.</p> <p>This Link <b>expires in 5 mintues.</b></p> <p>Press <a href=${currentUrl + "resetpassword/" + token }>here</a> to proceed.</p>`,
               
            };
              
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  console.log('Email sent: ' + info.response);
                  res.json({success:true , message:"Successfuly Sent the mail"})
                }
            });

        }
    }
    
})



router.post("/resetpassword/:token", async (req, res) => {
    
    const { password } = req.body;
    const { token } = req.params;

    if (!password) {
        return res.json({ success: false, message: "Empty input field!" });
    } else if (password.length < 6) {
        return res.json({ success: false, message: "Password is too short!" });
    } else {
        try {
            const decoded = jwt.verify(token, process.env.KEY);
            const id = decoded.id; 

            const setRounds = 10;
            const hashedPassword = await bcrypt.hash(password, setRounds);
            const response = await Donors.findByIdAndUpdate(id, { password: hashedPassword });

            if (!response) {
                return res.json({ success: false, message: "An error occurred finding Donor. Please try again later!" });
            } else {
                return res.json({ success: true, message: "Successfully reset password." });
            }
        } catch (err) {
            console.log(err);
            return res.json({ success: false, message: "Invalid token" });
        }
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
