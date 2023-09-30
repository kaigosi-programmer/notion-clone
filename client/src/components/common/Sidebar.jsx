import { Drawer, ListItemButton,List,Box, Typography, IconButton } from '@mui/material'
import React from 'react';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import assets from '../../assets';
import { Link, useNavigate } from 'react-router-dom';
import{useSelector}from "react-redux";



function Sidebar() {
    const navigate=useNavigate();
    const user=useSelector((state)=>state.user.value);
    const logout=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
  return (
    <Drawer container={window.document.body} valiant="permament" open={true} sx={{width:250,height:"100vh"}}>
        <List sx={{width:250,height:"100vh", backgroundColor:assets.colors.secondary}}>
            <ListItemButton>
                <Box sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <Typography variant="body2" fontWeight="700">{user.username}</Typography>
                </Box>
                <IconButton onClick={logout}>
                    <LogoutOutlinedIcon/>
                </IconButton>
            </ListItemButton>
            <Box sx={{paddingTop:"10px"}}></Box>
            <ListItemButton>
                <Box sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <Typography variant="body2" fontWeight="700">お気に入り</Typography>
                </Box>
            </ListItemButton>
            <Box sx={{paddingTop:"10px"}}></Box>
            <ListItemButton>
                <Box sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <Typography variant="body2" fontWeight="700">プライベート</Typography>
                </Box>
                <IconButton>
                <AddBoxOutlinedIcon fontSize="small"/>
                </IconButton>
            </ListItemButton>
            <ListItemButton sx={{pl:"20px"}} component={Link} to="/memo/47324rhrh">
                <Typography>📝仮置きのメモ</Typography>
            </ListItemButton>
        </List>
        
    </Drawer>
  )
}

export default Sidebar