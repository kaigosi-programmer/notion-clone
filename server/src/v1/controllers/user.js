const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');
const User = require("../models/user");
require('dotenv').config();
exports.register = async (req, res) => {
    //パスワードの受け取り
    const password = req.body.password;
    try {
        //パスワードの暗号化
        req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);
        //ユーザーの新規作成
        const user = await User.create(req.body);
        const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, { expiresIn: "24h" });
        res.status(200).json({ user, token });
    } catch (err) {
        return res.status(500).json(err);
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(401).json({
                errors: [{
                    params: "username",
                    msg: "ユーザーが存在しません"
                }]
            })
        }
        const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8);
        if (decryptedPassword !== password) {
            return res.status(401).json({
                errors: [{
                    params: "password",
                    msg: "passwordが無効です"
                }]
            })
        }
        const token = JWT.sign({ id: user._id }, process.env.TOKEN_SECRET_KEY, { expiresIn: "24h" });
        res.status(200).json({ user, token });

    } catch (err) {
        return res.status(500).json(err);
    }
}

