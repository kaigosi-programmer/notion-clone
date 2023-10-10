import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import memoApi from '../api/memoApi';
import { setMemo } from '../redux/features/memoSlice';

function Home() {
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const memos = useSelector((state) => state.memo.value);

  useEffect(()=>{
    if(memos.length>0){
      const firstMemoId=memos[0]._id;
      navigate(`/memo/${firstMemoId}`);
    }
  },[memos,navigate]);
  const createMemo = async() => {
    try{
      setLoading(true);
      const res=await memoApi.create();
      const newMomos=[res,...memos];
      dispatch(setMemo(newMomos));
      console.log(res);
      navigate(`/memo/${res._id}`);
      
    }catch(err){
      alert(err);
    }finally{
      setLoading(false);
    }
  }
  return (
    <Box sx={{ height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <LoadingButton variant="outlined" onClick={() => createMemo()} loading={loading}>最初のメモを作成</LoadingButton>
    </Box>
  )
}

export default Home