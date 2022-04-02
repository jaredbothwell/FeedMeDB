import React,{useState} from "react";
import { AnimatePresence } from "framer-motion";
import {Route, Routes, useLocation} from 'react-router'
import Navbar from './components/Navbar';
import './App.css';
import Test from "./pages/Test";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Account from "./pages/Account";
import Recipe from "./pages/Recipe";

export default function App(){

  const [user,SetUserData] = useState(null);
  const [loggedIn,SetLoggedIn] = useState(false);

  function userLoggedIn(loginStatus)
  {
    SetUserData(loginStatus[0]);
    SetLoggedIn(loginStatus[1]);

    console.log(user);
  }

  const location = useLocation();
  return (
    <>

        <Navbar loggedIn={loggedIn}/>
        <AnimatePresence exitBeforeEnter>
          <Routes key={location.pathname} location={location}>
            <Route path='/login' exact element={<Login userLoggedIn={loginStatus => userLoggedIn(loginStatus)}/>}/>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/test' exact element={<Test/>}/>
            <Route path='/account' exact element={<Account user={user}/>}/>
            <Route path='/recipe' exact element={<Recipe/>}/>

          </Routes>
          </AnimatePresence>

    </>
  )
}

