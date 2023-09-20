const JWT=require('jsonwebtoken');
const User =require('../models/user');
//クライアントから渡されたJWTが正常か検証
const tokenDecode=(req)=>{
const bearerHeader=req.headers["authorization"];
if(bearerHeader){
    const bearer=bearerHeader.split(" ")[2];
try{
   const decodedToken=JWT.verify(bearer,process.env.TOKEN_SECRET_KEY);
   return decodedToken;
}catch{
  return false;
}
}else{
    return false;
}
}

//JWT認証を検証するためのミドルウェア
exports.verifyToken=async(req,res,next)=>{
const tokendecoded=tokenDecode(req);
if(tokendecoded){
    //そのJWTと位置するユーザーを探してくる
    console.log(tokendecoded);
    const user=await User.findById(tokendecoded.id);
    if(!user){
        return res.status(401).json("権限がありません");
    }
    req.user=user;
    next();
}else{
    return res.status(401).json("権限がありません");
}
}