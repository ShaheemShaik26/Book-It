const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User');

async function verifyPassword(plainTextPassword, hashedPasswordFromDB) {
    try {
        const isMatch = await bcrypt.compare(plainTextPassword, hashedPasswordFromDB);
        console.log("Manual bcrypt.compare result:", isMatch);
        return isMatch;
    } catch (error) {
        console.error("Error during bcrypt.compare:", error);
        return false;
    }
}

async function main() { 
    await mongoose.connect('mongodb://127.0.0.1:27017/bookitDB', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const user = await User.findOne({ email: 'test@example.com' });

    if (!user) {
        console.error('User not found!');
        mongoose.disconnect();
        return;
    }

    const plainTextPassword = 'yourTestPassword'; 
    const hashedPasswordFromDB = user.password;

    const result = await verifyPassword(plainTextPassword, hashedPasswordFromDB);

    if (result) {
        console.log("Password matches!");
    } else {
        console.log("Password does NOT match!");
    }

    mongoose.disconnect();
}

main();