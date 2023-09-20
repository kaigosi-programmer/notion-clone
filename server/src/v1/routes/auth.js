const express = require('express');
const router = express.Router();
const validation = require('../handlers/validation');
const User = require("../models/user");
const userController = require('../controllers/user');
const tokenHandler=require('../handlers/tokenHandler');
const { body } = require('express-validator');
require('dotenv').config();

//ユーザー登録API
router.post('/register',
    body("username").isLength({ min: 8 }).withMessage('ユーザー名は８文字以上である必要があります'),
    body('password').isLength({ min: 8 }).withMessage('パスワードは８文字以上である必要があります'),
    body('confirmPassword').isLength({ min: 8 }).withMessage('確認用パスワードは８文字以上である必要があります'),
    body('username').custom((value) => {
        return User.findOne({ username: value }).then((user) => {
            if (user) {
                return Promise.reject('このユーザー名はすでに使われています');
            }
        })
    }),
    validation.validate,
    userController.register
);

//ユーザーログインAPI
router.post('/login',
    body("username").isLength({ min: 8 }).withMessage('ユーザー名は８文字以上である必要があります'),
    body('password').isLength({ min: 8 }).withMessage('パスワードは８文字以上である必要があります'),
    validation.validate,
    userController.login
)

//JWT認証API
router.post('/verify-token',tokenHandler.verifyToken,(req,res)=>{
    return res.status(200).json({user:req.user});
})

module.exports = router;