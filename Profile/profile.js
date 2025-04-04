const express = require('express');
const multer = require('multer');
const path = require('path');
const User = require('./models/User');
const app = express();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/profilePics');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.put('/api/users/:userId/updateProfilePic', upload.single('profilePic'), async (req, res) => {
    const userId = req.params.userId;
    const profilePicUrl = `/uploads/profilePics/${req.file.filename}`;

    try {
        const user = await User.findByIdAndUpdate(userId, { profilePic: profilePicUrl }, { new: true });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, profilePicUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error updating profile picture' });
    }
});
