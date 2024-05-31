const Do_Request = require("../../models/Donation");

const RemoveRequest = async (req,res)=>{
        try{
            let Request_id = req.body.Re_id;
            const remove = await Do_Request.findOneAndDelete({Re_id:Request_id})
            if(!remove ){
               res.json({ success: false, message: "Request not found"}) 
            }else{
                res.json({ success:true, message: "Removed Successfully"}) 
            }
        }catch (error) {
            console.error('Error removing request:', error);
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
module.exports = RemoveRequest

