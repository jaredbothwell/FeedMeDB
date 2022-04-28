import React, { useEffect, useState } from 'react'
import './css_files/CreateRecipeForm.css'
import CloseIcon from '@mui/icons-material/Close';
import { Fab, IconButton, Rating, Typography } from '@mui/material';

export default function DisplayRecipe({recipeid, isClicked, handleClose}) {
    
    const [recipe,setRecipe] = useState(null);
    const [userName,setUserName] = useState(null);

    useEffect(()=>
    {
        if(isClicked)
        {
            fetch(
                "http://localhost:8000/api/recipes/" + recipeid)
                .then((res) => res.json())
                .then((json) => {
                    setRecipe(json);
                    fetch(
                        "http://localhost:8000/api/users/" + json.createdByID)
                        .then((res) => res.json())
                        .then((json) => {
                            setUserName(json.name);
                        })
                    
                })
        }
    }, [isClicked])


  return (
      <>
      {recipe != null && userName != null?
        <div className='form_container2'>
            
            <h1>
            {recipe.name}
            </h1>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Creator: {userName}
            </Typography>
            <h1>
            Preparation Time: {recipe.prepTime}
            </h1>
            <h1>
            {recipe.difficulty}
            </h1>

            <Rating name="no-value" value={null} />
            <Fab sx={{width:120, backgroundColor: 'gray'}} onClick={handleClose}  variant="extended" color="primary" aria-label="add">
                Close
        </Fab>
        </div>
      :
      <h1>loading</h1>
      }
      

    </>
  )
}
