import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Picker from '@emoji-mart/react';

function EmojiPicker(props) {
    const [selectedEmoji,setSelectedEmoji]=useState();
    const [isShowPicker,setIsShowPicker]=useState(false);

    useEffect(()=>{
        setSelectedEmoji(props.icon);
    },[props.icon]);

    const showPicker=()=>{
        setIsShowPicker(!isShowPicker);
    }

    const selectEmoji=(e)=>{
    const emojiCode=e.unified;
    const emoji = String.fromCodePoint(parseInt(emojiCode, 16));
    console.log(emoji);
    setIsShowPicker(false);
    props.onChange(emoji);
    }
    return (
        <Box>
            <Typography onClick={showPicker} variant="h3" fontWeight="700" sx={{cursor:"pointer"}}>{selectedEmoji}</Typography>
            <Box  sx={{display:isShowPicker?"block":"none",zIndex:100,position:"absolute"}}>
            <Picker onEmojiSelect={selectEmoji}/>
            </Box>
        </Box>
    )
}

export default EmojiPicker