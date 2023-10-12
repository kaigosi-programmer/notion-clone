import React, { useEffect, useState } from 'react'
import { Box, IconButton, TextField } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import memoApi from '../api/memoApi';
import { useDispatch, useSelector } from 'react-redux';
import { setMemo } from '../redux/features/memoSlice';
import EmojiPicker from '../components/common/EmojiPicker';

function Memo() {
  const { memoId } = useParams();
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');
  const [description, setDescription] = useState('');
  const memos = useSelector((state) => state.memo.value);
  const dispatch = useDispatch();
  const navigate=useNavigate();

  let timer;
  const timeout = 500;

  const deleteMemo = async () => {
    try {
      await memoApi.delete(memoId);
      const newMemos = memos.filter((e) => e._id !== memoId);
      dispatch(setMemo(newMemos));
      if(newMemos.length===0){
        navigate('/memo');
      }else{
        navigate(`/memo/${newMemos[0]._id}`)
      }
    } catch (err) {
      alert(err);
    }
  }


  const updateTitle = (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);
    try {
      timer = setTimeout(async () => {
        await memoApi.update(memoId, { title: newTitle })
      }, timeout)

    } catch (err) {
      alert(err);
    }
  }

  const updateDescription = (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);
    try {
      timer = setTimeout(async () => {
        await memoApi.update(memoId, { description: newDescription })
      }, timeout)

    } catch (err) {
      alert(err);
    }
  }

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId);
        setTitle(res.title);
        setDescription(res.description);
        setIcon(res.icon);
      } catch (err) {
        alert(err)
      }
    }
    getMemo();
  }
    , [memoId]);

    const onIconChange=async(newIcon)=>{
      let temp=[...memos];
      const index=temp.findIndex((e)=>e._id === memoId);
      temp[index]={...temp[index],icon:newIcon};
      setIcon(newIcon);
      dispatch(setMemo(temp));
      try{
      await memoApi.update(memoId,{icon:newIcon})
      }catch(err){
        alert(err);
      }
    }
  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton onClick={deleteMemo} variant="outlined" color="error">
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <Box>
          <EmojiPicker onChange={onIconChange} icon={icon}/>
        <TextField onChange={updateTitle} value={title} placeholder="無題" variant="outlined" fullWidth sx={{ ".MuiOutlinedInput-input": { padding: 0 }, ".MuiOutlinedInput-notchedOutline": { border: "none" }, ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: 700 } }} />
        <TextField onChange={updateDescription} value={description} placeholder="ここに自由に記入して下さい" variant="outlined" fullWidth sx={{ ".MuiOutlinedInput-input": { padding: 0 }, ".MuiOutlinedInput-notchedOutline": { border: "none" }, ".MuiOutlinedInput-root": { fontSize: "1rem" } }} />
        </Box>
      </Box>
    </>
  )
}

export default Memo