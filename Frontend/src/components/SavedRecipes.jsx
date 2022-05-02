import './css_files/Ingredient.css'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Backdrop, Fab, IconButton, Typography } from '@mui/material';

export default function SavedRecipes({closeForm, isDisplayed}) {



  const [savedRecipes, setSavedRecipes] = useState([]);
  const [update, setUpdate] = useState(false);

  useEffect(()=>
  {
    console.log("stress")
    var temp_id = localStorage.getItem("user_id");
    fetch(
      "http://localhost:8000/api/user-recipes/" + temp_id)
      .then((res) => res.json())
      .then((json) => {
          if(json !== undefined)
          {
            let temp_arr = []
            console.log(json);
            for(var i = 0; i < json.length; i++)
            {
                if(json[i].isBookmarked)
                {
                  temp_arr.push(json[i]);
                }
            }
            setSavedRecipes(temp_arr);
          }
      })

  },[isDisplayed,update]);

  const handleUnsave = (userRecipe) =>
  {
    let data = {
      userID: userRecipe.userID,
      recipe: {
        id: userRecipe.recipe.id
      },
      rating: userRecipe.rating,
      isBookmarked: !userRecipe.isBookmarked
    }
    
    // sending null ratings will break
    let http_string = "http://localhost:8000/api/user-recipes/add-edit"
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch(http_string, requestOptions)
      .then(()=>
      {
        const timeOutId = setTimeout(() => setUpdate(!update), 500);
        return () => clearTimeout(timeOutId);
      })

  }

  return (
    <div className='form_container1'>
    <Typography gutterBottom variant="h4" className='Display_Recipe_Text'>
          Saved Recipes
      </Typography>
      <TableContainer component={Paper}>
    <Table sx={{ minWidth: 500 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">Recipe</TableCell>
          <TableCell align="center">Saved</TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {savedRecipes.map((row) => (
          <TableRow
            key={row.userRecipeID}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="center" component="th" scope="row">
              {row.recipe.name}
            </TableCell>
            <TableCell  align="center">
                  <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={()=>{handleUnsave(row)}}
                      >
                      <BookmarkIcon/>
                  </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <div className='input_field'>
  <Fab sx={{width:120, backgroundColor: 'gray', marginLeft:2}} onClick={closeForm} variant="extended" color="primary" aria-label="add">
              Close
      </Fab>

  </div>

  </div>
  )
}
