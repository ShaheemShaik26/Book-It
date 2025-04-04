const express = require('express');
const router = express.Router();
const User = require('../models/User'); 
const multer = require("multer");
const path = require("path");

router.get('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/users/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;
        console.log("Update Profile Request Body:", req.body);  

        const { username, bio } = req.body;

        const user = await User.findByIdAndUpdate(userId, 
            { username: username, bio: bio }, 
            { new: true, runValidators: true }
        );

        if (!user) {
            console.log("User not found with ID:", userId);
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        console.log("User updated successfully:", user);
        res.json({ success: true, message: 'Profile updated successfully' });
    } catch (err) {
        console.error("Error updating user:", err);
        res.status(500).json({ message: 'Server error' });
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); 
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


router.put('/users/:userId/updateProfilePic', upload.single('profilePic'), async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        user.profilePic = `/uploads/${req.file.filename}`;
        await user.save();

        res.json({ success: true, profilePicUrl: user.profilePic });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});



module.exports = router;