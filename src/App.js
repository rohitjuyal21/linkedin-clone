import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Feed from './components/Feed/Feed';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Sidebar from './components/Sidebar/Sidebar';
import Widgets from './components/Widgets/Widgets';
import { login, selectUser } from './features/userSlice';
import { auth } from './Firebase';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // user is logged in
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL,
          })
        )
      } else {
        // user is logged out
      }
    })
  }, [])

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
        <Header />
        <div className='app__body'>
          <Sidebar /> 
          <Feed />
          <Widgets />
        </div>
        </>
      )}
      
    </div>
  );
}

export default App;
