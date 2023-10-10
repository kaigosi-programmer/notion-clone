import { Box, Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material';
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import React, { useEffect, useState } from 'react'
import assets from '../../assets';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import memoApi from '../../api/memoApi';
import { setMemo } from '../../redux/features/memoSlice';


function Sidebar() {
    const [activeIndex,setActiveIndex]=useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const{memoId}=useParams();
    const memos = useSelector((state) => state.memo.value);
    const user = useSelector((state) => state.user.value);
    const logout = () => {
        localStorage.removeItem("token");
        navigate('/login');
    }


    useEffect(() => {
        const getMemos = async () => {
            try {
                const res = await memoApi.getAll();
                dispatch(setMemo(res));
            } catch (err) {
                alert(err);
            }
        }
        getMemos();
    }, [dispatch]);

    useEffect(() => {
     const activeIndex=memos.findIndex((e)=>e._id===memoId);
     console.log(activeIndex);
     setActiveIndex(activeIndex);
    }
    , [navigate,memos,memoId]);

    const addMemo=async()=>{
    try{
    const res= await memoApi.create();
    const newMemos=[res,...memos];
    dispatch(setMemo(newMemos));
    navigate(`memo/${res._id}`);
    }catch(err){
        alert(err)
    }
    }

    return (
        <Drawer container={window.document.body} variant="permanent" open={true} sx={{ width: 250, height: "100vh" }}>
            <List sx={{ width: 250, height: "100vh", backgroundColor: assets.colors.secondary }}>
                <ListItemButton>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant="body2" fontWeight="700">{user.username}</Typography>
                        <IconButton onClick={logout}>
                            <LogoutOutlinedIcon />
                        </IconButton>
                    </Box>
                </ListItemButton>
                <Box sx={{ paddingTop: "10px" }}></Box>
                <ListItemButton>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant="body2" fontWeight="700">お気に入り</Typography>
                    </Box>
                </ListItemButton>
                <Box sx={{ paddingTop: "10px" }}></Box>
                <ListItemButton>
                    <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography variant="body2" fontWeight="700">プライベート</Typography>
                        <IconButton onClick={()=>addMemo()}>
                            <AddBoxOutlinedIcon fontSize="small" />
                        </IconButton>
                    </Box>
                </ListItemButton>
                {memos.map((item, index) => (
                    <ListItemButton selected={index === activeIndex} key={item._id} sx={{ pl: "20px" }} conponent={Link} to={`/memo/${item._id}`}>
                        <Typography>{item.icon}{item.title}</Typography>
                    </ListItemButton>
                ))}

            </List>
        </Drawer>
    )
}

export default Sidebar