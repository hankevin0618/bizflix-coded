import '../css/App.css';
import React, { useEffect, useState } from "react"
import AppRouter from './Router';
import { authService } from "../myBase";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons'
import Loading from './Elements/Loading';
require("dotenv").config()

library.add(fab, fas);

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj(user);
      }
      setInit(true);
    });

  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj} />
      ) : (
        <Loading />
      )}

    </>
  );
}

export default App;
