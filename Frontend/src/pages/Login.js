import React, { useState } from 'react'
import {LoginForm} from '../components/LoginForm'
import AnimatedPage from "./AnimatedPage";
import {Link, useNavigate} from 'react-router-dom'
import { CreateAccountForm } from '../components/CreateAccountForm';


export default function Login(props) {

  const [loggedIn,setLoggedIn] = useState(false);
  const [newAccount,setNewAccount] = useState(false);
  const [wrong_login_flag,setWrongLogin] = useState(false);
  const navigate = useNavigate();



  
  function handleLogin(input)
  {
    //console.log(input)
    if(input[0].id != null)
    {
      props.userLoggedIn(input);
      localStorage.setItem('user_id',input[0].id);
      setLoggedIn(true);
      navigate("/");
    }
    else
    {
      setWrongLogin(true);
    }
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
                    {newAccount?
                      <>
                        <h1 style={{color:'white'}}>Create new account</h1>
                        <CreateAccountForm/>
                        <p style={{color:'white', marginTop:'10%'}}>Already have an account? <a style={{cursor:'pointer', color:'Wheat'}} onClick={()=>{setNewAccount(false)}}>Login</a></p>
                      </>
                      :
                      <>
                        <h1 style={{color:'white'}}>Login with your credentials</h1>
                        <LoginForm updateStatus={input => handleLogin(input)}/>
                        {wrong_login_flag&&
                        <>
                        <p style={{color: 'red', marginTop:'5%'}}>Username or password is incorrect, try again</p>

                        </>}
                        <p style={{color:'white', marginTop:'10%'}}>Don't have an account yet? <a style={{cursor:'pointer', color:'Wheat'}} onClick={()=>{setNewAccount(true)}}>Create one</a></p>
                      </>
                    }

                </div>
            </div>
          :
          <h1 style={{color:'white', textAlign:'center'}}>Succesfully Logged in</h1>
          }
        </div>
      </AnimatedPage>
  )
}
