const Do_Details = require("../../models/DonorModels/Donetion_Detials");
const NodeRSA = require('node-rsa');

const Donor_related_Donation = async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let ReqOrphanage = await Do_Details.findOne({ Do_id: id });
        if (!ReqOrphanage) {
            return res.status(404).json({ success: false, message: "No Detials About You" });
        }
    
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

       let key_private = new NodeRSA(private_key);

       // Export public key for decryption
       let public_key = key_private.exportKey("pkcs8-public");

        // Decrypt hashed fields
        const decryptedDonations = donations.map(donation => {
            return {
                ...donation._doc,
                Do_email : key_private.decrypt(donation.Do_email,"utf8"),
                amount: key_private.decrypt(donation.amount,"utf8"),
                card_No: key_private.decrypt(donation.card_No,"utf8"),
                CCV: key_private.decrypt(donation.CCV,"utf8"),
            };
        });

        res.json(decryptedDonations);
    } catch (error) {
        console.error("Error occurred while fetching donations:", error);
        res.status(500).json({ success: false, message: "Error occurred while fetching donations" });
    }
};

module.exports = Donor_related_Donation;
