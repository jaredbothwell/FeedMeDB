import React from 'react'
import {LoginForm} from '../components/LoginForm'
import AnimatedPage from "./AnimatedPage";
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
                    <LoginForm />
                </div>
            </div>
        </div>
      </AnimatedPage>
  )
}
