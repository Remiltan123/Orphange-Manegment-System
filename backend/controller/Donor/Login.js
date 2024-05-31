const Donors = require('../../models/Donor');
const jwt = require('jsonwebtoken');

const DonorLogin = async (req, res) => {

  const { email, password } = req.body;

  if(!email && !password){
    return res.json({ success: false, errors: "Please provide email and password" });
  }

  if (!email) {
    return res.json({ success: false, errors: "Please provide email" });
  }

  if (!password) {
    return res.json({ success: false, errors: "Please provide password" });
  }


  try {
    let Donor = await Donors.findOne({ email });

    if (Donor) {
      const checkpass = password === Donor.password;

      if (checkpass) {
        const data = {
          Donor: {
            id: Donor.id,
            name: Donor.name ,
            Do_id: Donor.Do_id 
          }
        };
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token, name: Donor.name, Do_id: Donor.Do_id });
      } else {
        res.json({ success: false, errors: "Wrong password" });
      }
    } else {
      res.json({ success: false, errors: "invalid mail id or password, please try agian" });
    }
  } catch (error) {
    res.status(500).json({ success: false, errors: error.message });
  }
}

module.exports = DonorLogin;
