import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react';
import{Link}from 'react-router-dom';
import authApi from '../api/authApi';

function Register() {
  const [usernameErrorText,setUsernameErrorText]=useState('');
  const [passwordErrorText,setPasswordErrorText]=useState('');
  const [confirmPasswordErrorText,setConfirmPasswordErrorText]=useState('');
  const handleSubmit=(e)=>{
    e.preventDefault();
    setConfirmPasswordErrorText('');
    setPasswordErrorText('');
    setUsernameErrorText('');
    //入力欄の文字列を取得
    const data=new FormData(e.target);
    const username=data.get("username").trim();
    const password=data.get("password")
    const confirmPassword=data.get("confirmPassword")
    console.log(username);
    console.log(password);
    console.log(confirmPassword);

    let error=false
    if(username===""){
      error=true;
      setUsernameErrorText("名前を記入して下さい");
     }
    if(password===""){
      error=true;
      setPasswordErrorText("パスワードを記入して下さい");
      }
    if(confirmPassword===""){
      error=true;
      setConfirmPasswordErrorText("確認用パスワードを記入して下さい");
     }
    if(error)return;
    //新規登録APIを叩く
    try{
     const res=authApi.register({username,password,confirmPassword});
     localStorage.setItem("token",res.token);
     console.log("新規登録に成功しました");
    }catch(err){
      console.log(err)
    }
  }
  return (
    <>
     <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField fullWidth id="username" label="お名前" margin="normal" name="username" required helperText={usernameErrorText}/>
        <TextField fullWidth id="password" label="パスワード" margin="normal" name="password" required type="password" helperText={passwordErrorText}/>
        <TextField fullWidth id="confirmPassword" label="確認用パスワード" margin="normal" name="confirmPassword" required type="password" helperText={confirmPasswordErrorText}/>
        <LoadingButton sx={{mt:3,mb:2,}}fullWidth type="submit" loading={false} color="primary" variant="outlined">アカウント作成</LoadingButton>
        
    </Box>
    <Button component={Link} to="/login">すでにアカウントを持っていますか❔ログイン</Button>
    </>
   
  )
}

export default Register