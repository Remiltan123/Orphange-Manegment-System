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

//RSA.exportKey("pkcs8-private");//private
RSA.exportKey("pkcs8-public")//public

const FeachEmail = async(req,res)=>{
    try{
        const resphonse = await Subscripe.find({})
        if(!resphonse){
            res.json({success:false,message:"No One Subscribe"})
        }else{

            const emails = await resphonse.map( resphonse=>{
                return{
                    email: RSA.decrypt(resphonse.email,"utf8")
                }
            })
            res.json({success:true, emails})
        }

    }catch(err){
        console.error("error:",err)
        res.json({success:false,message:"Please try again later"})
    }  
    
}

module.exports =FeachEmail