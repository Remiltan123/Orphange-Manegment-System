const express = require("express")
const Childs = require("../../models/Child")
const router = express.Router()


// Add child
router.post("/AddChilds", async(req,res)=>{

    try{
        let id;
        const getchilds = await Childs.find({})
        if(getchilds.length>0){
            id = getchilds[getchilds.length-1].id +1
        }else{
            id=1;
        }

        const {OR_id,Name,Age,Gender,Diaseases, Specialneed} = req.body;

        if(!OR_id ||!Name || !Age || !Gender || !Diaseases || !Specialneed){
            res.json({ success: false, message: "Empty input fields!" })
        }

        if (!/^[a-zA-Z\s]+$/.test(Name)) {
            return res.json({ success: false, message: "Invalid name entered!" });
        }

        const child = new Childs({
            id:id,
            OR_id:  OR_id,
            Name:Name,
            Age:Age,
            Gender:Gender,
            Diaseases:Diaseases,
            Specialneed:Specialneed,
        })

        await child.save();
        res.json({success:true, meassage:"Child added successfully"})

    }catch(err){
        console.error(err)
        res.status(500).json({ success: false, meassage: "Something Wrong please try agian" });
    }
   

})



module.exports = router;

