const express = require("express")
const Childs = require("../../models/Child")
const Orphanges = require("../../models/Orphanage")
const Adopted = require('../../models/Adoption')
const Adopters = require('../../models/Adopter')
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
      const response2 = await Adopted.findOneAndDelete({Ch_id:id})
      if (!response) {
        return res.json({ success: false, message: "An error occurred while finding Child" });
      }else if(!response2){
        return res.json({ success: false, message: "An error occurred while finding Adoption" });
      }else {
        return res.json({ success: true, message: "Deleted successfully" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Something went wrong, please try again" });
    }
  });

// Group the childs  base on the orphange 
router.get("/GroupChild", async(req,res)=>{
    try{
        const response = await Orphanges.aggregate([
            {
                $lookup:{
                    from: 'childs',
                    localField: 'Oid',
                    foreignField: 'OR_id',
                    as: 'children'
                }
            }
        ])

        if( response.length===0){
            res.json({success:false, message:"NO ANY ORPHANGE NOT CONTAINTS CHILS"})
        }else{
            res.json({success:true, Data:response})
        }

    }catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Something went wrong, please try again" });
    }
    
})

//Update the child avilable

router.post("/childBooked/:token", async (req, res) => {
    try {
        // Get Adopter Id
        let token = req.params.token;
        const decoded = jwt.verify(token, process.env.KEY);
        let _id = decoded.id;

        const Adopter = await Adopters.findById(_id);

        if (!Adopter) {
            return res.status(404).json({ success: false, message: "Adopter not found" });
        }

        // Update details
        const id = req.body.id;
        const response = await Childs.findOneAndUpdate({ id: id }, { Available: false }, { new: true });

        if (!response) {
            return res.status(400).json({ success: false, message: "Child not found or update failed" });
        }

        // Create the model of Adopters
        const adopted = new Adopted({
            Ch_id: id,
            Ad_id: Adopter.Aid,
            
        });
        const response2 = await adopted.save();

        if (!response2) {
            return res.status(500).json({ success: false, message: "Failed to save adoption details" });
        }

        res.json({ success: true, message: "Adoption successful" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Something went wrong, please try again" });
    }
});

//Accept Adoption (fetc adoption)
router.get("/GetAdoption/:token", async (req, res) => {
    try {
        const token = req.params.token;
        const decoded = jwt.verify(token, process.env.KEY);
        const _id = decoded.id;

        const findorphange = await Orphanges.findById(_id);
        if (!findorphange) {
            return res.json({ success: false, message: "An error occurred while finding the orphanage" });
        }

        const Joinresult = await Childs.aggregate([
            {
                $lookup: {
                    from: 'adopteds',
                    localField: 'id',
                    foreignField: 'Ch_id',
                    as: 'adoptedDetails'
                }
            },
            {
                $unwind: "$adoptedDetails"
            },
            {
                $lookup: {
                    from: 'adopeters',
                    localField: 'adoptedDetails.Ad_id',
                    foreignField: 'Aid',
                    as: 'adopterDetails'
                }
            },
            {
                $unwind: "$adopterDetails"
            }
        ]);

        if (Joinresult.length === 0) {
            return res.json({ success: false, message: "No children adopted" });
        } else {
            return res.json({ success: true, ChildData: Joinresult, Orphange: findorphange });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: "Something went wrong, please try again" });
    }
});


// Accept Request
router.post("/Accept-Request", async (req, res) => {
    const { Ch_id } = req.body;
    try {
      const findAdoption = await Adopted.findOneAndUpdate({Ch_id:Ch_id}, { Accept: true }, { new: true });
      if (!findAdoption) {
        return res.status(400).json({ success: false, message: "Adoption not found or update failed" });
      } else {
        res.json({ success: true , message:"Accepted mail send succusefully" });
      }
    } catch (error) {
      console.error("Error updating adoption request:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });
  
//Rejected Request
router.post("/Reject-Request", async (req, res) => {
    const { Ch_id } = req.body;
    try {
      const deleteAdoption = await Adopted.findOneAndDelete({Ch_id:Ch_id});
      if (!deleteAdoption) {
        return res.status(400).json({ success: false, message: "Adoption not found " });
      }
      
      const updateChild = await Childs.findOneAndUpdate({id:Ch_id} ,{Available:true},{new:true})
      if (!updateChild) {
        return res.status(400).json({ success: false, message: "Child not found or update failed" });
      }
      else {
        res.json({ success: true , message:"Request Rejected" });
      }
    } catch (error) {
      console.error("Error updating adoption request:", error);
      res.status(500).json({ success: false, message: "An error  occur please try again" });
    }
  });
  

module.exports = router;

