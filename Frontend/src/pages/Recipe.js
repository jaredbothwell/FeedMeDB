import React from 'react'
import AnimatedPage from './AnimatedPage';

export default function Recipe() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const recipeId = urlParams.get('recipeId')
    const recipeName = urlParams.get('name')

  return (
    <AnimatedPage>
    <div style={{color:"white", fontSize: 20, textAlign: "center"}}>recipe Name: {recipeName}</div>
    <div style={{color:"white", fontSize: 20, textAlign: "center"}}>recipe Id: {recipeId}</div>
    </AnimatedPage>
  )
}
