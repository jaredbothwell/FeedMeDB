import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Navbar from './components/Navbar';
import './App.css';
import Test from "./pages/Test";
import Home from "./pages/Home";

export default function App(){
  return (
    <>
      <Router>
        <Navbar/>
          <Routes>
            <Route path='/' exact element={<Home/>}/>
            <Route path='/test' exact element={<Test/>}/>
          </Routes>
      </Router>
    </>
  )
}

