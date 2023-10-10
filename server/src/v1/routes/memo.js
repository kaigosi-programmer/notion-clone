const express = require('express');
const router = express.Router();
const memoController = require('../controllers/memo');
const tokenHandler=require('../handlers/tokenHandler');

//メモ作成
router.post("/",tokenHandler.verifyToken,memoController.create);

//ログインしているユーザーのメモを全て取得
router.get("/",tokenHandler.verifyToken,memoController.getAll);

//ログインしているユーザーのメモを一つ取得
router.get("/:memoId",tokenHandler.verifyToken,memoController.getOne);

//ログインしているユーザーのメモを更新
router.put("/:memoId",tokenHandler.verifyToken,memoController.update);

//ログインしているユーザーのメモを削除
router.delete("/:memoId",tokenHandler.verifyToken,memoController.delete);

module.exports = router;