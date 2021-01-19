import React, { useEffect } from 'react'
import { resetCameraImage, selectcameraImage } from './features/cameraSlice'
import './Preview.css'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';
import { useDispatch } from 'react-redux'
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from './firebase';
import firebase from 'firebase'
import { selectUser } from './features/appSlice';

function Preview() {
    const cameraImage = useSelector(selectcameraImage);
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectUser)
    const closePreview = () => {
        dispatch(resetCameraImage());
    }
    const sendPost = () => {
        const id = uuidv4();
        const uploadTask = storage.ref(`posts/${id}`).putString(cameraImage,'data_url');
        uploadTask.on('state_changed', null, (error) => {console.log(error)}, () => {
            storage.ref('posts').child(id).getDownloadURL().then((url) => {
                db.collection('posts').add({
                    imageUrl: url,
                    username: user.username,
                    read: false,
                    profilePic: user.profilePic,
                    timeStamp: firebase.firestore.FieldValue.serverTimestamp(),  
                });
                history.replace('/chats');
            });
        });
    };
    useEffect(() => {
        if (!cameraImage) {
            history.replace('/');
        }         
    }, [cameraImage, history])
    return (
        <div className='preview'>
            <CloseIcon onClick={closePreview} className='preview__close' fontSize='large' />
            <div className='preview__toolbarRight'>
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src={cameraImage} alt='vijay' />
            <div onClick={sendPost} className='preview__footer'>
                <h2>Send Now</h2>
                <SendIcon className='preview__sendIcon' fontSize='small' />
            </div>
        </div>
    )
}


export default Preview
