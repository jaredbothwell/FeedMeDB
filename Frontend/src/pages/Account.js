import React from 'react'
import AnimatedPage from './AnimatedPage'

export default function Account(props) {
  console.log(props.user)
  return (
    <AnimatedPage>
    <div>
        {props.user != null?
         <h1 style={{color:'white', textAlign:'center'}}>Hi {props.user.name}</h1>
         :<h1 style={{color:'white', textAlign:'center'}}>please log in</h1> }
    </div>
    </AnimatedPage>
  )
}
