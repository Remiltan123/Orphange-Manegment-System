var nodemailer = require('nodemailer');
const path = require("path")

const SendMail = async(req,res)=>{

  var from= req.body.from
  var to = req.body.to
  var subject = req.body.subject
  var text = req.body.text

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

module.exports = SendMail

