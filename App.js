import { Avatar } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import Chats from './Chats';
import ChatView from './ChatView';
import { login, logout, selectUser } from './features/appSlice';
import { auth } from './firebase';
import Login from './Login';
import Preview from './Preview';
import WebcamCapture from './WebcamCapture';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch()
  useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          dispatch(login({
            username: authUser.displayName,
            profilePic: authUser.photoURL,
            id: authUser.uid,
          }))
        }
        else {
          dispatch(logout())
        }
      })
  }, [])
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
          <Avatar className='app__logo' src='https://scontent.fjai5-1.fna.fbcdn.net/v/t1.0-9/20264920_1264442717017180_2140474373907077802_n.jpg?_nc_cat=105&ccb=2&_nc_sid=09cbfe&_nc_ohc=W-jdwjhomlYAX_ewgX_&_nc_ht=scontent.fjai5-1.fna&oh=955d899853d76246cde31caffc873f04&oe=602846E1' alt='vijay' />
            <div className='app__body'>
              <div className='app__bodybackground'>
                <Switch>
                  <Route exact path="/chats/view">
                    <ChatView />
                  </Route>
                  <Route exact path="/chats">
                    <Chats />
                  </Route>
                  <Route exact path="/preview">
                    <Preview />
                  </Route>
                  <Route exact path="/">
                    <WebcamCapture />
                  </Route>
                </Switch>
              </div>
            </div>
        </>
        )}
      
      </Router>
    </div>
  );
}

export default App;
