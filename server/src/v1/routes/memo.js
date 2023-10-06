const express = require('express');
const router = express.Router();
const memoController = require('../controllers/memo');
const tokenHandler=require('../handlers/tokenHandler');

//メモ作成
router.post("/",tokenHandler.verifyToken,memoController.create);

//ログインしているユーザーのメモを全て取得
router.get("/",tokenHandler.verifyToken,memoController.getAll);


module.exports = router;