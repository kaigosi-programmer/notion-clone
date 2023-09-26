import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react';
import{Link}from 'react-router-dom';
import authApi from '../api/authApi';

function Register() {
  const [usernameErrorText,setUsernameErrorText]=useState('');
  const [passwordErrorText,setPasswordErrorText]=useState('');
  const [confirmPasswordErrorText,setConfirmPasswordErrorText]=useState('');
  const [loading,setLoading]=useState(false);
  const handleSubmit=async(e)=>{
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
     if(password!==confirmPassword){
      error=true;
      setConfirmPasswordErrorText("パスワードと確認用パスワードが異なります")
     }
    if(error)return;
    setLoading(true);
    //新規登録APIを叩く
    try{
     const res=await authApi.register({username,password,confirmPassword});
     localStorage.setItem("token",res.token);
     setLoading(false);
     console.log("新規登録に成功しました");
    }catch(err){
      const errors=err.data.errors;
      errors.forEach(err=>{
        console.log(err);
        if(err.path==="username")setUsernameErrorText(err.msg);
        if(err.path==="password")setPasswordErrorText(err.msg);
        if(err.path==="confirmPassword")setConfirmPasswordErrorText(err.msg);
      })
      setLoading(false);
    }
  }
  return (
    <>
     <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField fullWidth id="username" label="お名前" margin="normal" name="username" required helperText={usernameErrorText} error={usernameErrorText!==""} disabled={loading}/>
        <TextField fullWidth id="password" label="パスワード" margin="normal" name="password" required type="password" helperText={passwordErrorText} error={passwordErrorText!==""} disabled={loading}/>
        <TextField fullWidth id="confirmPassword" label="確認用パスワード" margin="normal" name="confirmPassword" required type="password" helperText={confirmPasswordErrorText} error={confirmPasswordErrorText!==""} disabled={loading}/>
        <LoadingButton sx={{mt:3,mb:2,}}fullWidth type="submit" loading={loading} color="primary" variant="outlined">アカウント作成</LoadingButton>
        
    </Box>
    <Button component={Link} to="/login">すでにアカウントを持っていますか❔ログイン</Button>
    </>
   
  )
}

export default Register