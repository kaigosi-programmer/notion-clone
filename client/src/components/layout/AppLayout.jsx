import { Box } from '@mui/material';
import React,{useEffect} from 'react';
import { Outlet, useNavigate } from 'react-router';
import authUtils from '../../utils/authUtils';
import Sidebar from '../common/Sidebar';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/userSlice';

function AppLayout() {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    useEffect(()=>{
        //JWTを持っているのか確認する
       const checkAuth=async()=>{
        //確認チェック
       const user=await authUtils.isAuthenticated();
       if(!user){navigate('/login');}else{
       dispatch(setUser(user));
       }
       }
       checkAuth();
    },[navigate,dispatch])
    return (
        <div>
            <Box sx={{display:"flex"}}>
                <Sidebar/>
                <Box sx={{flexGrow:1,p:1,width:"max-content"}}>
                    <Outlet/>
                </Box>
            </Box>

        </div>

    )
}

export default AppLayout