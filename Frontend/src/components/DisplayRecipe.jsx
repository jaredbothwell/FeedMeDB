import React, { useEffect, useState } from 'react'
import './css_files/Display_Recipe.css'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Button, Chip, CircularProgress, Fab, IconButton, Rating, Typography } from '@mui/material';
import styled from '@emotion/styled';

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
        <div className='Display_Recipe_Container'>
            
            <Typography  variant="h4" className='Display_Recipe_Text'>
            {recipe.name}
            </Typography>
            <Typography className='Display_Recipe_Text' sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Creator: {userName}
            </Typography>

            <hr
        style={{
            color: 'lightgray',
            backgroundColor: 'lightgray',
            height: 1,
            marginTop: 5,
            marginBottom: 10

        }}
        
        />
        
            <Typography className='Display_Recipe_Text'>
            Preparation Time: {recipe.prepTime} minutes
            </Typography>
            
            <Typography className='Display_Recipe_Text'>
            Difficulty: {recipe.difficulty}/5
            </Typography>

            <div className="row">
                <div style={{padding: 0}} class="col-sm d-flex justify-content-end">
                    <Typography  className='Display_Recipe_Text'>
                        Average Rating: 
                    </Typography>
                </div>
 
            <div style={{padding: 0}} class="col-sm d-flex justify-content-start">
            <Rating
        defaultValue={2}
        precision={1}
        icon={<FastfoodIcon fontSize="inherit" />}
        emptyIcon={<FastfoodIcon fontSize="inherit" />}
        readOnly
        sx={{color:"#1c93d4"}}
      />
      
            </div>
            
            </div>
            <hr
        style={{
            color: 'lightgray',
            backgroundColor: 'lightgray',
            height: 1,
            marginTop: 10,
            marginBottom: 20

        }}
        
        />
                    <Typography  variant="overline" className='Display_Recipe_Text'>
            Directions
            </Typography>
            <div style={{ overflow: "auto", textOverflow: "ellipsis", width: '100%' , alignSelf: 'center', maxHeight: 200}} id="style-1">
            <Typography className='Display_Recipe_Text'>
                {recipe.directions}
            </Typography>
            </div>

            <Typography  variant="overline" className='Display_Recipe_Text'>
            Ingredients
            </Typography>
            <div style={{ overflow: "auto", maxHeight: 105, display: "flex",  flexWrap: "wrap", justifyContent: "center"}} id="style-1">
              {
                recipe.ingredients.map((ingredient) => (<Chip key={ingredient.id} style={{margin: 2 }} label={ingredient.name} color="info" />))
              }
            </div>
            <hr
        style={{
            color: 'lightgray',
            backgroundColor: 'lightgray',
            height: 1,
            marginTop: 20,
            marginBottom: 20

        }}
        />
                    <Button sx={{ marginBottom: 1}}  variant="outlined" startIcon={<BookmarkBorderIcon />}>
        Save
      </Button>
            <div className="row">
                <div style={{padding: 0}} class="col-sm d-flex justify-content-end">
                    
                    <Typography sx={{ fontStyle: 'italic' }} className='Display_Recipe_Text'>
                        Leave a rating?: 
                    </Typography>
                </div>
                <div style={{padding: 0}} class="col-sm d-flex justify-content-start">
                    <Rating name="no-value" value={null}
        sx={{color:"#1c93d4"}}/>
                </div>
            </div>
            <Fab sx={{width:120, backgroundColor: 'gray', alignSelf: 'center', marginTop: 2}} onClick={handleClose}  variant="extended" color="primary" aria-label="add">
                Close
        </Fab>
        </div>
      :
      <CircularProgress size="5rem"/> 
      }
      

    </>
  )
}
