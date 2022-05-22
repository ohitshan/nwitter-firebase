import React, { useState, useEffect } from 'react';
import { updateProfile } from "firebase/auth";
import AppRouter from 'components/Router';
import { authService } from 'fbase';
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        if (user.displayName === null) {
          updateProfile(user, { displayName: "put your name" })
        }
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (arg) => updateProfile(user, { displayName: user.displayName })
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, [])

  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (arg) => user.updateProfile(arg)
    })
  }

  return (
    <>
      {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing"}
      <footer>&copy; {new Date().getFullYear()}Nwitter</footer>
    </>
  );
}

export default App;
