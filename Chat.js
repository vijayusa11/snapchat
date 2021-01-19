import { Avatar } from '@material-ui/core'
import React from 'react'
import './Chat.css'
import StopIcon from '@material-ui/icons/Stop';
import ReactTimeAgo from 'react-timeago'
import {useDispatch} from 'react-redux'
import { selectImage } from './features/appSlice';
import { db } from './firebase';
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';

function Chat({ id, username, profilePic, timeStamp, read, imageUrl }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const open = () => {
        if(!read) {
            dispatch(selectImage(imageUrl));
            db.collection('posts').doc(id).set({
                read: true,
            }, { merge: true })
            
        }
        history.push('/chats/view');
    }
    return (
        <div onClick={open} className='chat'>
            <Avatar className='chat__avatar' src={profilePic} />
            <div className='chat__info'>
                <h4>{username}</h4>
                <p>{!read && 'Tap to view -'} <ReactTimeAgo date={new Date(timeStamp?.toDate()).toUTCString()} /></p>
            </div>
            {!read && <StopIcon className='chat__readIcon'/>} 
        </div>
    )
}

export default Chat
