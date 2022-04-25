import React, { useState } from 'react'
import AnimatedPage from './AnimatedPage';
import single_recipe from '../mock_data/single_recipe';
import './css_files/recipe.css'
export default function Recipe() {

  const [recipe,setRecipe] = useState(single_recipe);


  return (
    <AnimatedPage>
      
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '10%' }}>
          <div>
            <h1 style={{color:'wheat'}} >{recipe.name}</h1>
            <div className='form_container' >
              <div className='display_label' >{recipe.name}</div>
              <div className='display_label' >{recipe.prepTime}</div>
              <div className='display_label' >{recipe.difficulty}</div>
              <div className='display_label' >{recipe.directions}</div>
            </div>
          </div>
        </div>
    </AnimatedPage>
  )
}
