const express = require("express");
const router = express.Router();
const DonorService = require("../service/DonorService");

router.post("/", async(req, res) => {
  try {
    const {
      name, 
      phoneNumber, 
      address, 
      dateOfBirth, 
      gender, 
      bloodType, 
      medicalHistory
    } = req.body
    let result = await DonorService.addDonor({
      name, 
      phoneNumber, 
      address, 
      dateOfBirth, 
      gender, 
      bloodType, 
      medicalHistory
    });
    res.send(result); 
  } catch (error) {
    console.error('Error adding donor:', error);
    res.status(400).json(error);
  }
  
});
router.get("/", async (req, res) => {
  let result = await DonorService.getAllDonors();
  res.send(result);
});
router.get("/:donorId", async (req, res) => {
  const donorId = req.params.donorId;
  console.log(donorId)
  let result = await DonorService.getDonorById(donorId);
  res.send(result);
});
module.exports = router;
