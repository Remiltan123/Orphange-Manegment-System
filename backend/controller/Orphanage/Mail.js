const express = require('express');
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const router = express.Router();


const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });



router.post('/Sendmail', upload.single('attachment'), async (req, res) => {
    const { from, to, subject, text } = req.body;
    const attachment = req.file;

    if (!from || !to || !subject || !text) {
        return res.json({ success: false, message: "Empty input fields!" });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(from)) {
        return res.json({ success: false, message: "Invalid email entered!" });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "orphanagegroup09@gmail.com",
            pass: "jfhv wioi uoob rcls",
        }
    });

    const mailOptions = {
        from,
        to,
        subject,
        text,
        attachments: attachment ? [{ path: attachment.path }] : []
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return res.json({ success: false, message: error.message });
        } else {
            console.log('Email sent: ' + info.response);
            res.json({ success: true, message: "Successfully sent the mail" });

            if (attachment) {
                fs.unlink(attachment.path, function (err) {
                    if (err) {
                        console.error(err);
                    } else {
                        console.log("Deleted attachment");
                    }
                });
            }
        }
    });
});

module.exports = router;














/*
const SendMail = async(req,res)=>{

  var from= req.body.from
  var to = req.body.to
  var subject = req.body.subject
  var text = req.body.text
  const attachment = req.file;

  if (from === "" || to === "" || subject === "" || text === "") {
    return res.json({ success: false, message: "Empty input fields!" });
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(from)) {
      return res.json({ success: false, message: "Invalid email entered!" });
  }

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "orphanagegroup09@gmail.com",
      pass: "jfhv wioi uoob rcls",
    }
  });
  
  var mailOptions = {
    from: from,
    to: to,
    subject: subject,
    text: text,
    
    attachments: attachment ? [{ path: attachment.path }] : []
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.json({success:true , message:"Successfuly Sent the mail"})
      
      if (attachment) {
        fs.unlink(attachment.path, function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log("Deleted attachment");
            }
        });
    }

    }
  });
}

module.exports = SendMail

*/