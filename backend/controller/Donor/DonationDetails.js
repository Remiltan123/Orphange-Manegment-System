const Do_Details = require("../../models/DonorModels/Donetion_Detials");
const Do_Request = require("../../models/Donation");
const NodeRSA = require('node-rsa');
const jwt = require('jsonwebtoken');
const router = require("../../routes");

// Private key
const private_key = '-----BEGIN PRIVATE KEY-----\n'+
 'MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAujmWpI8xh2mpwQdK\n'+
 'SvT5hF5TKoQhNK64aH4BuvyHP4SBslM/DrFWl6Cjot466xRT0yuP6IX1ZPonR3ut\n'+
 'zxqwkwIDAQABAkB634igJ8M8X+Gb9Z11e9IvHrWtNeVbB3WxrIKjx//NThNNJHfO\n'+
 'uYvyE2xl/bnLRn4DIFiOg9YofrZs8uZ3RGBBAiEA/xYknqJx3PW3NYR/szxFPBA1\n'+
 'sDW3Socv/BZ1gNQVfCMCIQC65FCaUWjjf8qtkAkplOydcPbGi2Ny/WX1XgiC/+fI\n'+
 '0QIgadmLapRoAVOpKbkIsJyS8kCbtroji/abD9VV/xaCr9cCIH/23j2bak8C6/qE\n'+
 '+dEP2CdA9qchP5m3aT1lAjz4DXNRAiEA5GGbifTBLfAjsNZRTEoc530KXha1Wsd4\n'+
 'q+seuoD+Ix4=\n'+
 '-----END PRIVATE KEY-----';

const key_public = new NodeRSA(private_key);

key_public.exportKey("pkcs8-private"); // private
key_public.exportKey("pkcs8-public");  // public

router.post("/GiveDonetion/:token",async(req,res)=>{
    const { Oname, purpose, amount, Do_name, Do_email, card_No, CCV, month } = req.body;
    const { token } = req.params;

    if (!Oname || !purpose || !amount || !Do_name || !Do_email || !card_No || !CCV || !month) {
        return res.json({ success: false, message: "Empty input fields!" });
    }

    if (!/^[a-zA-Z\s]+$/.test(Do_name)) {
        return res.json({ success: false, message: "Invalid name entered!" });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Do_email)) {
        return res.json({ success: false, message: "Invalid email entered!" });
    }

    if (!/^\d{16}$/.test(card_No)) {
        return res.json({ success: false, message: "Invalid card number entered!" });
    }

    if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(month)) {
        return res.json({ success: false, message: "Invalid expiration date entered!" });
    }

    if (!/^\d{3,4}$/.test(CCV)) {
        return res.json({ success: false, message: "Invalid security code entered!" });
    }

    try {
        const encryptedDo_email = key_public.encrypt(Do_email.toString(), 'base64');
        const encryptedCardNo = key_public.encrypt(card_No.toString(), 'base64');
        const encryptedCCV = key_public.encrypt(CCV.toString(), 'base64');

        const decoded = jwt.verify(token, process.env.KEY);
        const id = decoded.id; 

        const Do_Detail = new Do_Details({
            Do_id: id,
            Oname,
            purpose,
            Do_name,
            amount,
            Do_email: encryptedDo_email,
            card_No: encryptedCardNo,
            CCV: encryptedCCV,
        });

        await Do_Detail.save();

        const _id = req.body._id;
        const response = await Do_Request.findByIdAndUpdate(_id, { $inc: { raised_amount: amount } }, { new: true });
        
        if(!response) {
            console.error("Error updating raised amount");
            return res.json({ success: false, message: "An error occurred while updating amount" });
        } else {
            console.log("Updated amount for request ID:");
        }

        res.json({ success: true, message: "Thank You For Your Donation" });
   
    } catch (err) {
        console.error("Error occurred: " + err);
        res.status(500).json({ success: false, message: "Error occurred while saving the data" });
    }
})


module.exports = router;
