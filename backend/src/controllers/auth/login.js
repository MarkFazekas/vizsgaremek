const jwt = require('jsonwebtoken');
const users = require('../../models/user.model');
const logger = require("../../config/logger");

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    const userInDatabase = await users.findOne({email: email})

    if (userInDatabase != null && userInDatabase.password === password) {
        const accessToken = jwt.sign({
            email: userInDatabase.email,
            role: userInDatabase.role
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY
        });

        logger.info("Successfully logged in with: " + email);
        res.json({
            accessToken,
            user: userInDatabase
        });
    } else {
        logger.info("Failed to login with: " + email);
        return res.sendStatus(401);
    }

};
