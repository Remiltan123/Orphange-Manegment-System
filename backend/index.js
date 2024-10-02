const express=require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const multer = require("multer");
const path = require("path");
const port = 1010;
const app = express();

const router=require("./routes")
const Orphanage = require("./models/Orphanage")


// Middleware
app.use(express.json());
app.use(cors());
app.use(router)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Increase payload size limit for JSON and URL-encoded data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));


//Donor APi
const UserRouter = require('./controller/Donor/User')
app.use("/user",UserRouter)

const SeeDonetionRequset = require("./controller/Donor/Seerequest")
app.use("/",SeeDonetionRequset)

//Orphange Api
const ORuserRouter = require('./controller/Orphanage/ORUser')
app.use("/",ORuserRouter)

//send mail 
const ORSendmail = require('./controller/Orphanage/Mail')
app.use("/",ORSendmail )

//Adopter Api
const AdopterUserRouter = require("./controller/Adopter/Aduser")
app.use("/", AdopterUserRouter)

//Donor donetion
const DonorDonetion = require("./controller/Donor/DonationDetails")
app.use("/",DonorDonetion);

//About child
const AboutChild = require("./controller/Orphanage/AboutChlid")
app.use("/", AboutChild )





// Connect with homepage
app.get("/",(req,res)=>{
    res.send("App is running")
})

// Database connection with MongoDB GroupKJL09@09
mongoose.connect("mongodb+srv://orphanagegroup09:Group09@cluster1.ed1mhk6.mongodb.net/");
if(mongoose.connect){
    console.log("MongoDb Connected.")
}

// Image store engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('image'), (req, res) => { 
    if (!req.file) {
        return res.status(400).json({success:false, message: "File upload failed" });
    }
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    });
});


///select priticular orphange when select
app.get("/orphanage/:id", async (req, res) => {
    let id = req.params.id;
    try {
        const ReqOrphanage = await Orphanage.findOne({ Oid: id });
        if (!ReqOrphanage) {
            return res.status(404).json({ success: false, message: "Orphanage not found" });
        }
        res.json(ReqOrphanage);
    } catch (error) {
        console.error('Error fetching orphanage:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


//select priticular orphange
app.get("/getorphanage/:token", async (req, res) => {
    
    let token = req.params.token;
    
    try {
        const decoded = jwt.verify(token, process.env.KEY);
        let id = decoded.id;
        
        const ReqOrphanage = await Orphanage.findOne({ _id: id });
        if (!ReqOrphanage) {
            return res.status(404).json({ success: false, message: "Orphanage not found" });
        }
        
        res.json({ success: true, ORData: ReqOrphanage });

    } catch (error) {
        console.error('Error fetching orphanage:', error);
        
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ success: false, message: "Invalid token" });
        }
        
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});




//Remove Orphanage
app.post("/RemoveOrphanage", async (req, res) => {
    try {
        const orphanageId = req.body.id;
        const deletedOrphanage = await Orphanage.findOneAndDelete({ Oid: orphanageId });
        if (!deletedOrphanage) {
            return res.status(404).json({ success: false, message: "Orphanage not found" });
        }
        console.log('Removed orphanage with ID:', orphanageId);
        res.json({ success: true, id: orphanageId });
    } catch (error) {
        console.error('Error removing orphanage:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

app.listen(port,(error)=>{
    if(!error){
        console.log("App is running on port :" + port)
    }
    else{
        console.log("error")
    }
});



//update the perdicular orphanage
/*
app.patch("/Update/:id", async (req, res) => {
    try {
        let id = parseInt(req.params.id);
        let ReqOrphanage = await Orphanage.findOne({ Oid: id });

        if (!ReqOrphanage) {
            return res.status(404).json({ success: false, message: "Orphanage not found" });
        }

        Object.assign(ReqOrphanage, req.body);
        await ReqOrphanage.save();

        console.log('updated');
        res.json({
            success: true,
            name: req.body.Oname
        });
    } catch (error) {
        console.error('Error updating orphanage:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
*/


/*
// Creating API for adding an orphanage
app.post("/addorphanage", async (req, res) => {
    // Generate automatically id
    const orphanages_indb = await Orphanage.find({});
    let id;
    // If there are existing orphanages, find the last orphanage's ID and increment it
    if (orphanages_indb.length > 0) {
        const lastOrphanage = orphanages_indb[orphanages_indb.length - 1];
        id = lastOrphanage.Oid + 1;
    } else {
        id = 1; // If no orphanages exist, start with ID 1
    }

    const newOrphanage = new Orphanage({ // Using the Orphanage model to create a new orphanage
        Oid: id,
        Oname: req.body.Oname,
        Oaddress: req.body.Oaddress,
        Oadmin_name: req.body.Oadmin_name,
        Ousername: req.body.Ousername,
        Opassword: req.body.Opassword,
        Omoboile_no:req.body.Omoboile_no,
        Omail:req.body.Omail,
    });

    // Save the new orphanage in the MongoDB
    await newOrphanage.save()
        .then(() => {
            console.log("Saved");
            res.json({
                success: true,
                name: req.body.Oname
            });
        })
        .catch((err) => {
            console.log("Error occurred: " + err);
            res.status(500).json({ message: "Error occurred while saving the orphanage" });
        });
});
*/

//Display the all orphange endpoint








