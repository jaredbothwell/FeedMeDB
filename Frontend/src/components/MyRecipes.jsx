import React, { useEffect, useState } from 'react'
import './css_files/Ingredient.css'
import RecipesTable from './RecipesTable';


export default function MyRecipes() {

  return (
    <div className='form_container1'>
        <h1>
            My Recipes
        </h1>
        <RecipesTable/>
    </div>
  )
}
