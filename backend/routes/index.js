const express = require('express')

const router = express.Router()

//LOGIN SIGNUP
const DonorSignup = require("../controller/Donor/Signup")
const DonorLogin = require("../controller/Donor/Login")


//ORphange
const GiveDonation = require("../controller/Orphanage/GiveDonation")
const RemoveRequest = require("../controller/Orphanage/RemovRequest")
const FeatchAllrequst = require("../controller/Orphanage/FeachRequest")
const Orphange_related_Donation = require("../controller/Orphanage/DonetedStatus")
const GiveFeedBack = require("../controller/Orphanage/GiveFeedback")
const VerifyDonetion = require("../controller/Orphanage/VerifyDonetion")
const FeachVerifications = require("../controller/Orphanage/FechVerification")
const SendMail = require("../controller/Orphanage/Mail")

//DONOR
const AllDonationRequest = require("../controller/Donor/Seerequest")
const GivenDonetion = require("../controller/Donor/DonationDetails")
const ViewFeedback = require("../controller/Donor/viewFeedback")
const Viewerifications = require("../controller/Donor/ViewAllHistory")
const Donor_related_Donation = require("../controller/Donor/DonetionStatusOfDonor")

//Home
const AddSubmail = require("../controller/Homepage/Subscripe")
const FeachEmail = require("../controller/Homepage/FeachEmail")
const AddArregentWants = require("../controller/Orphanage/ArregentWants")



router.post('/Signup',DonorSignup)
router.post('/DonorLogin',DonorLogin)
router.post('/GiveDonetion/:token', GivenDonetion )
router.get('/ViewFeedback/:token',ViewFeedback)
router.get("/ViewallHistroy/:token",Viewerifications )
router.get("/GetPerticularDonorDonetion/:token",Donor_related_Donation)






router.post('/RequestDonetion',GiveDonation)
router.post('/AllDonationRequest',AllDonationRequest)
router.post('/RemoveRequest',RemoveRequest)
router.post("/Allrequest",FeatchAllrequst)
router.patch("/DonetionStatus/:id",Orphange_related_Donation)
router.post("/GiveFeedBack",GiveFeedBack)
router.post("/Verify",VerifyDonetion)
router.patch("/FeachVerifications/:id",FeachVerifications)


router.post("/Sendmail",SendMail )
router.post("/AddSubscripe",AddSubmail)
router.get("/FeachEmail",FeachEmail)
router.post("/AddArregentWants",AddArregentWants)





module.exports = router