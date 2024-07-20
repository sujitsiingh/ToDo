const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

module.exports.register = (async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // if any one of the field from email and password is not filled
        if (!email || !password) {
            return res.json({
                success: false,
                message: 'email or password is empty!!.. fill in both',
            });
        }

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            console.log('email already registered', email);
            return res.status(404).json({ message: 'Email already registered' });
        }

        req.body.password = await bcrypt.hash(password, 10);

        // Create new user
        let newUser = new User(req.body);

        await newUser.save();
        console.log("New user saved", newUser);

        res.status(201).json({
            message: "Registration successful...", success: true, data: newUser,
        });

    } catch (error) {
        console.log('Error during registration', error);
        return res.status(500).json({ message: 'Registration failed', success: false });
    }
});

const generateSecretKey = () => {
    const secretKey = crypto.randomBytes(32).toString("hex");
    return secretKey;
};

const secretKey = generateSecretKey();

module.exports.login = (async (req, res) => { 
    try {
        const { email, password } = req.body;
        let existUser = await User.findOne({ email: email });
        if (!existUser) {
            return res.json({ status: 401, success: true, message: "user not found with this email" });
        }
        // bcrypting the password and comparing the one in db
        if (await bcrypt.compare(password, existUser.password)) {

            const token = jwt.sign({ userId: existUser._id }, secretKey, { expiresIn: '23h' });
            existUser.save();

            return res.json({ success: true, status: 200, message: "user Logged in", data: existUser, token: token });
        }
        return res.json({ success: false, status: 400, message: "user credentials are not correct", });
    } catch (error) {
        res.status(500).json({ message: 'login error' + error.message });
    }
});
