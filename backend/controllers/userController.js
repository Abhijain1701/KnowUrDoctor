import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
import mongoose from "mongoose"; // ✅ REQUIRED
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js"; // ✅ REQUIRED

// API to register user

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Missing Detail" });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter a valid email" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a Strong password" });
    }

    //hasing user password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API for user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
// API to update user profile

const updateProfile = async (req, res) => {
    try {
      const { userId, name, phone, address, gender } = req.body;
  
      if (!userId || !name || !phone || !gender || !address) {
        return res
          .status(400)
          .json({ success: false, message: "Data is Missing" });
      }
  
      const updatedFields = {
        name,
        phone,
        gender,
        address: JSON.parse(address), // make sure address is parsed correctly
      };
  
      await userModel.findByIdAndUpdate(userId, updatedFields);
  
      return res.json({ success: true, message: "Profile Updated" });
    } catch (error) {
      console.error("Update error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };

  // API TO BOOK APPOINMENT 
  
  const bookappointment = async (req, res) => {
    try {
      const { docId, slotDate, slotTime } = req.body;
      const userId = req.user._id; // Get from authenticated user

      // Validate required fields
      if (!docId || !slotDate || !slotTime) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing required fields" 
        });
      }

      // Validate ObjectIds
      if (!mongoose.Types.ObjectId.isValid(docId)) {
        return res.status(400).json({ 
          success: false, 
          message: "Invalid doctor ID" 
        });
      }

      // Get doctor data
      const docData = await doctorModel.findById(docId).select('-password');
      if (!docData) {
        return res.status(404).json({ success: false, message: "Doctor not found" });
      }

      // Get user data
      const userData = await userModel.findById(userId).select('-password');

      // Check slot availability
      const slotsBooked = docData.slots_booked || {};
      if (slotsBooked[slotDate]?.includes(slotTime)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Slot already booked' 
        });
      }

      // Create appointment
      const appointmentData = {
        userId,
        docId,
        userData,
        docData,
        amount: docData.fees,
        slotTime,
        slotDate,
        date: Date.now(),
      };

      const newAppointment = new appointmentModel(appointmentData);
      await newAppointment.save();

      // Update doctor's booked slots
      await doctorModel.findByIdAndUpdate(docId, {
        $addToSet: {
          [`slots_booked.${slotDate}`]: slotTime
        }
      });

      res.json({ success: true, message: 'Appointment Booked', appointment: newAppointment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ 
        success: false, 
        message: error.message 
      });
    }
  };
  
  
  
export { registerUser, loginUser, getProfile, updateProfile,bookappointment };
