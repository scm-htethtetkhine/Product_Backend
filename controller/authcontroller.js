const userData = require("../models").User;
const bcrypt = require("bcryptjs");
const { generateAccessToken, generateRefreshToken } = require("../utility/tokenutility");

const register = async (req, res) => {
    await userData
    .findOne({ where: { email: req.body.email } })
    .then((data) => {
        if (data != null) {
            return res.status(400).json({ message: "Email already exists" });
        }
        userData.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            point: req.body.point,
            accesstoken: "",
            refreshtoken: "",
        });
        return res.status(201).json({ message: "User registered successfully" });
    })
    .catch((err) => {
        res.status(500).json("Error: " + err.message);
    });
};

const login = async (req, res) => {
    const { password, email } = req.body;
    await userData
    .findOne({ where: { email: email } })
    .then((data) => {
        if (data == null) {
            return res.status(404).json({ message: "User not found" });
        }
        
        let passwordValid = bcrypt.compareSync(password, data.password);
        if (!passwordValid) {
            return res.status(401).json({ message: "Invalid Password" });
        }
        
        // Generate access and refresh tokens using the tokenUtility
        const accessToken = generateAccessToken(data);
        const refreshToken = generateRefreshToken(data);
        
        userData.update(
            { accesstoken: accessToken, refreshtoken: refreshToken },
            { where: { id: data.id } }
        );
        
        return res.status(200).json({
            id: data.id,
            username: data.username,
            email: data.email,
            point: data.point,
            role: data.role,
            accesstoken: accessToken,
            refreshtoken: refreshToken,
        });
    })
    .catch((err) => {
        res.status(500).json(err.message);
    });
};

module.exports = {
    register,
    login,
};
