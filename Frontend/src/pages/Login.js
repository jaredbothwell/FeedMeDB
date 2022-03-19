import React from 'react'
import {LoginForm} from '../components/LoginForm'
import AnimatedPage from "./AnimatedPage";
import {Link} from 'react-router-dom'


export default function Login() {
  return (
      <AnimatedPage>
        <div className='container'>
            <div className='row justify-content-center'>
                <div style={{
                borderRadius: '40px',
                backgroundColor: '#565c68',
                padding:'10%',
                marginTop: '5%'}}>
                    <h1 style={{color:'white'}}>Login with your credentials</h1>
                    <LoginForm />
                    <p style={{color:'white', marginTop:'10%'}}>Don't have an account yet? <Link to={'/'}>Create one</Link></p>
                    
                </div>
            </div>
        </div>
      </AnimatedPage>
  )
}
