const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: '/uploads/profile_pics/default-profile.png' }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

module.exports = User;
