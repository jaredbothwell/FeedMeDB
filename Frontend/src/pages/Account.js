import React from 'react'
import AnimatedPage from './AnimatedPage'

export default function Account(props) {
  return (
    <AnimatedPage>
    <div>
        {props.userID != null?
         <h1 style={{color:'white', textAlign:'center'}}>Hi {props.userID}</h1>
         :<h1 style={{color:'white', textAlign:'center'}}>please log in</h1> }
    </div>
    </AnimatedPage>
  )
}
