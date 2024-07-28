const express = require("express")
const Childs = require("../../models/Child")
const Orphanges = require("../../models/Orphanage")
const router = express.Router()
const jwt = require("jsonwebtoken")


// Add child
router.post("/AddChilds", async (req, res) => {
    try {
        let id;
        const getchilds = await Childs.find({});
        if (getchilds.length > 0) {
            id = getchilds[getchilds.length - 1].id + 1;
        } else {
            id = 1;
        }

        const { OR_id, Name, Age, Gender, Diaseases, Specialneed } = req.body;

        if (!OR_id || !Name || !Age || !Gender || !Diaseases || !Specialneed) {
            return res.json({ success: false, message: "Empty input fields!" });
        }

        if (!/^[a-zA-Z\s]+$/.test(Name)) {
            return res.json({ success: false, message: "Invalid name entered!" });
        }

        const child = new Childs({
            id: id,
            OR_id: OR_id,
            Name: Name,
            Age: Age,
            Gender: Gender,
            Diaseases: Diaseases,
            Specialneed: Specialneed,
        });

        await child.save();
        return res.json({ success: true, message: "Child added successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Something went wrong, please try again" });
    }
});

// Get the all chilidren detilas of perticular orphange
router.get("/GetChild/:token", async (req, res) => {
   
    try {
        let token = req.params.token
        const decoded = jwt.verify(token, process.env.KEY);
        let id = decoded.id;

        const orphanage = await Orphanges.findOne({ _id: id });
        if (!orphanage) {
            return res.status(404).json({ success: false, message: "Orphanage not found" });
        }

        const children = await Childs.find({ OR_id: orphanage.Oid });
        if (children.length === 0) {
            return res.json({ success: false, message: "No Adopt child" });
        } else {
            return res.json({ success: true, Data:children });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Something went wrong, please try again" });
    }
});

// Update details
router.post("/UpdateChild", async (req,res)=>{
    try{
        const { id, OR_id, Name, Age, Gender, Diaseases, Specialneed } = req.body;
        const response = await Childs.findOneAndUpdate(
            {id:id},
            {
                OR_id: OR_id,
                Name: Name,
                Age: Age,
                Gender: Gender,
                Diaseases: Diaseases,
                Specialneed: Specialneed, 
            }
        )
        if(!response){
            return res.json({success:false, message:"An error occur while finding Child"})
        }else{
            return res.json({success:true, message:"Updated succuessfully"})
        }
    }catch(err){
        console.error(err);
        return res.status(500).json({ success: false, message: "Something went wrong, please try again" }); 
    }
   
   
})

//Remove Child 
router.post("/RemoveChild", async (req, res) => {
    try {
      const { id } = req.body;
      const response = await Childs.findOneAndDelete({ id: id });
      if (!response) {
        return res.json({ success: false, message: "An error occurred while finding Child" });
      } else {
        return res.json({ success: true, message: "Deleted successfully" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Something went wrong, please try again" });
    }
  });




module.exports = router;

