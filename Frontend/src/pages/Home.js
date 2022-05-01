import React from 'react'
import AnimatedPage from './AnimatedPage'
import "./css_files/Home.css"
import Grid from '@mui/material/Grid';

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
      <p style={{alignSelf:"center"}} class="margin-top-10">
          FeedMeDB is an opensource cookbook website where users can share their own recipes and loop up other recipes from the community. The project was developed for a Database System Concept class.
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
        <Grid style={{alignSelf:"center", marginTop: "50px"}} container spacing={2}>
        <Grid item xs={4}>
        <div style={{display: "flex", flexDirection:"column"}}>
          <h1 style={{alignSelf:"center", marginTop: "50px"}}>Top Users</h1>
          <p class="line-break margin-top-10"></p>
        </div>
          </Grid>
          <Grid item xs={4}>
          <div style={{display: "flex", flexDirection:"column"}}>
          <h1 style={{alignSelf:"center", marginTop: "50px"}}>Top Recipes</h1>
          <p class="line-break margin-top-10"></p>
        </div>
          </Grid>
          <Grid item xs={4}>
          <div style={{display: "flex", flexDirection:"column"}}>
          <h1 style={{alignSelf:"center", marginTop: "50px"}}>Most Active Users</h1>
          <p class="line-break margin-top-10"></p>
        </div>
          </Grid>
        </Grid>
      </div>
    </div>
  </section>



</div>
</AnimatedPage>
  )
}
