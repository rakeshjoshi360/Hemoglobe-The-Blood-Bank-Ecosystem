const pool = require("../db");

const donorInputCheck = (data) => {
    const {
      full_name,
      phone_number,
      address,
      date_of_birth,
      gender,
      blood_type,
      medical_history
    } = data
  
  if( !full_name || !phone_number || !address || !date_of_birth || !gender || !blood_type || !medical_history){
   throw {success: 'false', message: 'The donor information is incomplete'}
  }
  if(!/^\d{10}$/.test(phone_number)){
    throw {success: 'false', message: 'Invalid Phone Number'}
  }
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  if(!bloodGroups.includes(blood_type)){
    throw {success: 'false', message: "Invalid Blood Type"}
  }
}
exports.addDonor = async (data) => {
  try {
    const donorData = {
      full_name: data.name,
      phone_number: data.phoneNumber,
      address: data.address,
      date_of_birth: data.dateOfBirth,
      gender: data.gender,
      blood_type: data.bloodType,
      medical_history: data.medicalHistory
    };

    donorInputCheck(donorData);

    const checkExistingDonors = () => {
      return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM donors WHERE phone_number = ?', [donorData.phone_number], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    };

    const existingDonors = await checkExistingDonors();

    if (existingDonors.length !== 0) {
      return { success: 'false', message: 'Donor exists with the specified phone number' };
    }

    const insertDonor = () => {
      return new Promise((resolve, reject) => {
        pool.query('INSERT INTO donors SET ?', [donorData], (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        });
      });
    };

    const insertResult = await insertDonor();

    const getDonorDetails = () => {
      return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM donors WHERE donor_id = ?', [insertResult.insertId], (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

    const result = await getDonorDetails();

    const donorDetails = {
      donorId: result[0].donor_id,
      name: result[0].full_name,
      phoneNumber: result[0].phone_number,
      address: result[0].address,
      dateOfBirth: result[0].date_of_birth,
      gender: result[0].gender,
      bloodType: result[0].blood_type,
      medicalHistory: result[0].medical_history,
    };

    return donorDetails;

  } catch (error) {
    throw error;
  }
};
exports.getAllDonors = () => ({ msg: "test all" });
exports.getDonorById = () => ({ msg: "test" });
