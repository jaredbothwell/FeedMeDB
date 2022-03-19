import React, { useState } from 'react'
import {LoginForm} from '../components/LoginForm'
import AnimatedPage from "./AnimatedPage";
import {Link} from 'react-router-dom'


export default function Login(props) {

  const [loggedIn,setLoggedIn] = useState(false);

  function handleLogin(input)
  {
    props.userLoggedIn(input);
    setLoggedIn(true);
  }

  return (
      <AnimatedPage>
        <div className='container'>
          { !loggedIn?
            <div className='row justify-content-center'>
                <div style={{
                borderRadius: '40px',
                backgroundColor: '#565c68',
                padding:'10%',
                marginTop: '5%'}}>
                  <h1 style={{color:'Wheat'}}>Hardcoded users:<br/> username=user1<br/> password=pass1</h1>
                    <h1 style={{color:'white'}}>Login with your credentials</h1>
                    <LoginForm updateStatus={input => handleLogin(input)}/>
                    <p style={{color:'white', marginTop:'10%'}}>Don't have an account yet? <Link to={'/'}>Create one</Link></p>
                </div>
            </div>
          :
          <h1 style={{color:'white', textAlign:'center'}}>Succesfully Logged in</h1>
          }
        </div>
      </AnimatedPage>
  )
}
