import { Box } from '@mui/material';
import { Container } from '@mui/system';
import React,{useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router';
import notionLogo from '../../assets/images/notion-logo.png';
import authUtils from '../../utils/authUtils';

function AuthLayout() {
    const navigate=useNavigate();
    useEffect(()=>{
        //JWTを持っているのか確認する
       const checkAuth=async()=>{
        //確認チェック
       const isAuth=await authUtils.isAuthenticated();
       console.log(isAuth._id);
       if(isAuth)navigate('/');
       }
       checkAuth();
    },[navigate])
    return (
        <div>
            <Container component="main" maxWidth="xs">
                <Box sx={{
                    display: "flex",
                    marginTop: 6,
                    alignItems: "center",
                    flexDirection: "column"
                }}>
                    <img src={notionLogo} alt="" style={{ width: 100, height: 100, marginBottom: 3 }} />
                    NOTION-CLONE開発</Box>
                <Outlet />
            </Container>

        </div>

    )
}

export default AuthLayout