import React from 'react'
import AnimatedPage from './AnimatedPage'
import "./css_files/Home.css"
import Grid from '@mui/material/Grid';
import ActivityTabs from '../components/ActivityTabs';

export default function Home() {


  
  return (
      <AnimatedPage>
    <div id="parallax-world-of-ugg">



  <section>
    <div style={{marginTop: '80px'}}>
      <h2>Home</h2>
    </div>
  </section>

  <section>
    <div class="block">
      <div style={{display: "flex", flexDirection:"column"}}>

      <h1 style={{alignSelf:"center", marginTop: "10px"}}>About</h1>
        <p class="line-break margin-top-10"></p>
      <p style={{alignSelf:"center", textAlign:"center"}} class="margin-top-10">
      FeedMeDB is a modern, clean, and simple recipe lookup system that is meant to make meals easy. Users are able to create an account to be able to create, save, and modify their recipes. Once created, these recipes are available for other users to view, rate, and save for later use. The site also allows for filtering of recipes by ingredient, so that users can find recipes that contain ingredients they already have. FeedMeDB is meant for users of all ages, from college students to families. 
        </p>

        <h1 style={{alignSelf:"center", marginTop: "50px"}}>Share your Recipes</h1>
        <p class="line-break margin-top-10"></p>
        <p style={{alignSelf:"center"}} class="margin-top-10">
          Share recipes that you love and see how other users rate your recipes
        </p>

        <h1 style={{alignSelf:"center", marginTop: "50px"}}>Find your next meal</h1>
        <p class="line-break margin-top-10"></p>
        <p style={{alignSelf:"center"}} class="margin-top-10">
          Look up your next meal based off a list of ingredients or keywords
        </p>
    
      </div>
</div>
  </section>

  <section>
    <div class="parallax-two">
      <h2>Activity</h2>
    </div>
  </section>

  <section>
    <div class="block">
    <div style={{display: "flex", flexDirection:"column"}}>
      <div style={{alignSelf:"center"}}>
        <ActivityTabs />
      </div>
    
    </div>
    
    </div>
  </section>



</div>
</AnimatedPage>
  )
}
