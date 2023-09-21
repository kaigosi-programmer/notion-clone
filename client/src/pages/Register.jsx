import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import React from 'react';

function Register() {
  return (
    <Box component="form">
        <TextField fullWidth id="username" label="お名前" margin="normal" name="username" required/>
        <TextField fullWidth id="password" label="パスワード" margin="normal" name="password" required type="password"/>
        <TextField fullWidth id="confirmPassword" label="確認用パスワード" margin="normal" name="password" required type="password"/>
        <LoadingButton></LoadingButton>
    </Box>
  )
}

export default Register