import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { Outlet } from 'react-router';
import notionLogo from '../../assets/images/notion-logo.png';

function AuthLayout() {
  return (
    <div>
        <Container component="main" maxWidth="xs">
         <Box sx={{
            display:"flex",
            marginTop:6,
            alignItems:"center",
            flexDirection:"column"
            }}>
                <img src={notionLogo} alt="" style={{width:100,height:100,marginBottom:3}}/>
                NOTION-CLONE開発</Box>
            
        </Container>
        <Outlet/>
    </div>
    
  )
}

export default AuthLayout