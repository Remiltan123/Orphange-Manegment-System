const Subscripe = require("../../models/Subscripe")

const NodeRSA = require('node-rsa');

const private_key = '-----BEGIN PRIVATE KEY-----\n'+
 'MIIBVAIBADANBgkqhkiG9w0BAQEFAASCAT4wggE6AgEAAkEAujmWpI8xh2mpwQdK\n'+
 'SvT5hF5TKoQhNK64aH4BuvyHP4SBslM/DrFWl6Cjot466xRT0yuP6IX1ZPonR3ut\n'+
 'zxqwkwIDAQABAkB634igJ8M8X+Gb9Z11e9IvHrWtNeVbB3WxrIKjx//NThNNJHfO\n'+
 'uYvyE2xl/bnLRn4DIFiOg9YofrZs8uZ3RGBBAiEA/xYknqJx3PW3NYR/szxFPBA1\n'+
 'sDW3Socv/BZ1gNQVfCMCIQC65FCaUWjjf8qtkAkplOydcPbGi2Ny/WX1XgiC/+fI\n'+
 '0QIgadmLapRoAVOpKbkIsJyS8kCbtroji/abD9VV/xaCr9cCIH/23j2bak8C6/qE\n'+
 '+dEP2CdA9qchP5m3aT1lAjz4DXNRAiEA5GGbifTBLfAjsNZRTEoc530KXha1Wsd4\n'+
 'q+seuoD+Ix4=\n'+
 '-----END PRIVATE KEY-----'

let RSA = new NodeRSA(private_key);

RSA.exportKey("pkcs8-private");//private
RSA.exportKey("pkcs8-public")//public


const AddSubmail = async (req,res)=>{
    
    const {email} = req.body;
    const Email = email;

    if(!Email){
        return res.json({ success: false, message: "Empty input fields!" });
    }

    else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email)) {
        return res.json({ success: false, message: "Invalid email entered!" });
    }

    else{
        try{

            const response = await Subscripe.find({email:Email})
            if(response.ok){
                res.json({success:false, message:"You already Subscriped."})
            }
            else{
                const user_mail = RSA.encrypt(Email.toString(), 'base64');
                const subscripe = new Subscripe({
                    email:user_mail
                })
            
                await subscripe.save() 
                res.json({success:true , message:"Subscriped Succesfully"})
            }

            
        }catch(err){
            console.error("error:",err)
            res.json({success:false , message:"Fial. Please try again"})
        }
    }
    
}

module.exports = AddSubmail

