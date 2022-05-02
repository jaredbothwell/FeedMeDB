import React, { useEffect, useState } from 'react'
import './css_files/Display_Recipe.css'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Button,  CircularProgress, Fab, Rating, Typography } from '@mui/material';
import IngredientsMTable from './IngredientsMTable';

export default function DisplayRecipe({recipe, isClicked, handleClose}) {
    
    const [createdByUser,setUserName] = useState(null);
    const [LoggedInid, setUserID] = useState(null);
    const [userRecipe,setUserRecipe] = useState([]);

    const [isBookMarked, setIsBookMarked] = useState(false);
    const [localRating, setRating] = useState(null);

    const [avgRating, setAvgRating] = useState(null);

    //useEffect(()=>{console.log(userRecipe)},[userRecipe])


    useEffect(()=>
    {
        var temp_id = localStorage.getItem("user_id");
        setUserID(temp_id)
        if(isClicked)
        {
            fetch(
                "http://localhost:8000/api/users/" + recipe.createdByID)
                .then((res) => res.json())
                .then((json) => {
                    setUserName(json.name);
                })

            fetch(
                "http://localhost:8000/api/user-recipes/" + temp_id)
                .then((res) => res.json())
                .then((json) => {
                    
                    if(json.length > 0)
                    {
                        for(var i = 0; i < json.length; i++)
                        {
                            if(json[i].recipe.id === recipe.id)
                            {
                                console.log(json[i]);
                                setUserRecipe(json[i]);
                                setIsBookMarked(json[i].isBookmarked);
                                setRating(json[i].rating);
                            }
                        }

                    }
                })

            fetch(
                "http://localhost:8000/api/aggregate/recipe-average-rating/" + recipe.id)
                .then((res) => res.json())
                .then((json) => {
                    if(json !== undefined)
                    {
                        setAvgRating(json.AverageRating);
                    }
                })

            
        }
    }, [isClicked])

    const handleRating = (rating) =>
    {
        let data = {
            userID: LoggedInid,
            recipe: {
              id: recipe.id
            },
            rating: rating,
            isBookmarked: isBookMarked
          }
        
          let http_string = "http://localhost:8000/api/user-recipes/add-edit"
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          };
          fetch(http_string, requestOptions)
            .then(response => console.log(response))
    }

    const handleBookMark = (saveValue) =>
    {

        let data = {
            userID: LoggedInid,
            recipe: {
              id: recipe.id
            },
            rating: localRating,
            isBookmarked: saveValue
          }
          // sending null ratings will break
          let http_string = "http://localhost:8000/api/user-recipes/add-edit"
          const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          };
          fetch(http_string, requestOptions)
            .then(response => console.log(response))

    }
  return (
      <>
      {recipe != null && createdByUser != null?
        <div className='Display_Recipe_Container'>
            
            <Typography  variant="h4" className='Display_Recipe_Text'>
            {recipe.name}
            </Typography>
            <Typography className='Display_Recipe_Text' sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Creator: {createdByUser}
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
                {
                    avgRating!==null?
                
            <Rating
        value={avgRating}
        precision={1}
        icon={<FastfoodIcon fontSize="inherit" />}
        emptyIcon={<FastfoodIcon fontSize="inherit" />}
        readOnly
        sx={{color:"#1c93d4"}}
      />:
      <Typography  className='Display_Recipe_Text'>
     &nbsp;&nbsp;---
  </Typography>
    }
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

            <Typography variant="overline" className='Display_Recipe_Text'>
            Ingredients
            </Typography>
            <IngredientsMTable ingredientsList={recipe.ingredients}/>
            <hr
        style={{
            color: 'lightgray',
            backgroundColor: 'lightgray',
            height: 1,
            marginTop: 20,
            marginBottom: 20

        }}
        />
        {
            LoggedInid === null || LoggedInid === 'null'?
            <Typography sx={{ fontStyle: 'italic' }} className='Display_Recipe_Text'>Login to leave a review or save this recipe to your collection</Typography>:
            <>    
            <Button sx={{ marginBottom: 1}} onClick={()=>{handleBookMark(!isBookMarked)}}  variant={isBookMarked? "contained":"outlined"} startIcon={<BookmarkBorderIcon />}>
            {isBookMarked? "Unsave":"Save" }
          </Button>
                <div className="row">
                    <div style={{padding: 0}} class="col-sm d-flex justify-content-end">
                        <Typography sx={{ fontStyle: 'italic' }} className='Display_Recipe_Text'>
                            Leave a rating?: 
                        </Typography>
                    </div>
                    <div style={{padding: 0}} class="col-sm d-flex justify-content-start">
                        <Rating name="no-value" value={localRating} onChange={(e)=>{handleRating(e.target.value)}}
            sx={{color:"#1c93d4"}}/>
                    </div>
                </div></>
        }

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
