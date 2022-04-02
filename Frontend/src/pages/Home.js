import React,{useState, useEffect} from 'react'
import AnimatedPage from './AnimatedPage'
import './css_files/Home.css'
import Search from '../components/SearchBar'
import SmoothList from 'react-smooth-list';
import RecipeCard from '../components/Card' 
export default function Home() {
  const [testLabel,setLabel] = useState('')
  const [recipes,setRecipes] = useState([
    {"recipeID":1, "name":"eggs on toast"},
    {"recipeID":2, "name":"bacon"},
    {"recipeID":3, "name":"torbens appeaaatizers"},
    {"recipeID":4, "name":"bigmac"},
    {"recipeID":5, "name":"omlete"},
    {"recipeID":6, "name":"poptart"},
    {"recipeID":7, "name":"eggs on toast"},
    {"recipeID":8, "name":"bacon"},
    {"recipeID":9, "name":"torbens appeaaatizers"},
    {"recipeID":10, "name":"bigmac"},
    {"recipeID":11, "name":"omlete"},
    {"recipeID":12, "name":"poptart"},
])

  return (
    <AnimatedPage>

    <section className='home--search'>
      <div className='container'>
        <div className='row justify-content-center'>
          <h1 style={{marginTop: '20px'}}  className='label'>Look up a recipe</h1>
        </div>
        <div style={{marginTop: '20px'}} className='row justify-content-center'>
          <div>
            <Search/>
          </div>
        </div >
        <div className='row justify-content-center'>
          <label>{testLabel}</label>
        </div>
       </div>
    </section>

    <section>
      <SmoothList className='home--recipes' delay={100}>
        {
          recipes.map((recipe) => (
          <RecipeCard data={recipe} key={recipe.recipeID}/>
          ))
        }
      </SmoothList>

    </section>
    </AnimatedPage>
  )
}