import { Box, Button, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React, { useState } from 'react';
import{Link,useNavigate}from 'react-router-dom';
import authApi from '../api/authApi';

function Login() {
const navigate=useNavigate();

  const [usernameErrorText,setUsernameErrorText]=useState('');
  const [passwordErrorText,setPasswordErrorText]=useState('');
  const [loading,setLoading]=useState(false);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setPasswordErrorText('');
    setUsernameErrorText('');
    //入力欄の文字列を取得
    const data=new FormData(e.target);
    const username=data.get("username").trim();
    const password=data.get("password")
  

    let error=false
    if(username===""){
      error=true;
      setUsernameErrorText("名前を記入して下さい");
     }
    if(password===""){
      error=true;
      setPasswordErrorText("パスワードを記入して下さい");
      }
    if(error)return;
    setLoading(true);
    //新規登録APIを叩く
    try{
     const res=await authApi.login({username,password});
     localStorage.setItem("token",res.token);
     setLoading(false);
     console.log("ログインに成功しました");
     navigate('/');
    }catch(err){
      const errors=err.data.errors;
      errors.forEach(err=>{
        console.log(err);
        if(err.path==="username")setUsernameErrorText(err.msg);
        if(err.path==="password")setPasswordErrorText(err.msg);
        if(err.params==="username")setUsernameErrorText(err.msg);
        if(err.params==="password")setPasswordErrorText(err.msg);
      })
      setLoading(false);
    }
  }
  return (
    <>
     <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField fullWidth id="username" label="お名前" margin="normal" name="username" required helperText={usernameErrorText} error={usernameErrorText!==""} disabled={loading}/>
        <TextField fullWidth id="password" label="パスワード" margin="normal" name="password" required type="password" helperText={passwordErrorText} error={passwordErrorText!==""} disabled={loading}/>
        <LoadingButton sx={{mt:3,mb:2,}}fullWidth type="submit" loading={loading} color="primary" variant="outlined">ログイン</LoadingButton>
        
    </Box>
    <Button component={Link} to="/register">アカウントを持っていませんか❔新規登録</Button>
    </>
   
  )
}

export default Login