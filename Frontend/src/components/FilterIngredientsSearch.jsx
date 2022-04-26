import React, { useEffect, useState } from 'react'
import './css_files/CreateRecipeForm.css'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Fab, List, TextField } from '@mui/material';


export default function FilterIngredientsSearch(props) {


  useEffect(()=>
  {
    fetch(
      "http://localhost:8000/api/ingredients")
      .then((res) => res.json())
      .then((json) => {
        setAvailable(json);
      })
  }, [])

    const [filterIngredientsList,setFilterIngredientsList] = useState([])
    const [availableIngredients,setAvailable] = useState([])
    const [searchQuery,setQuery] = useState('');
    const [filteredIngredients,filterIngredients] = useState([])

    useEffect(() => {
      const timeOutId = setTimeout(() => filterIngredients(availableIngredients.filter(ingredient => ingredient.name.includes(searchQuery))), 500);
      return () => clearTimeout(timeOutId);
    }, [searchQuery]);


    const addToSearchFilter = (ingredient) => 
    {
        setFilterIngredientsList(filterIngredientsList.concat(ingredient))
        const newList = availableIngredients.filter((item) => item.Name !== ingredient.Name);
        setAvailable(newList);
    }

    const removeFromSearchFilter = (ingredient) =>
    {
        setAvailable(availableIngredients.concat(ingredient))
        const newList = filterIngredientsList.filter((item) => item.Name !== ingredient.Name);
        setFilterIngredientsList(newList);
    }

    const saveHandler = () =>
    {
        props.SendIngredientsToHomePage(filterIngredientsList);
    }
    

  return (
    <div className='form_container'>

    <h1>Ingredients included in search</h1>
    <List       sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      >
          {
            filterIngredientsList.map((ingredient) => (
                <ListItem key={ingredient.IngredientID} component="div" disablePadding>
                    <ListItemButton onClick={() => removeFromSearchFilter(ingredient)}>
                        <ListItemText primary={ingredient.name} primaryTypographyProps={{ style: {color:'black'} }} />
                    </ListItemButton>
            </ListItem>
            ))
            }
      </List>

      <hr
        style={{
            color: 'gray',
            backgroundColor: 'gray',
            height: 2,
            marginTop: 50,
            marginBottom: 50
        }}
        
        />
      <h1>ingredients list</h1>
      <TextField
              label="Search"
              variant="standard"
              name='ingredient_search'
              style={{marginBottom: 20}}
              onChange={event => setQuery(event.target.value)}
              />
    <List
       sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      >
                  {
            filteredIngredients.map((ingredient) => (
                <ListItem key={ingredient.IngredientID} component="div" disablePadding>
                <ListItemButton onClick={() => addToSearchFilter(ingredient)}>
                <ListItemText primary={ingredient.name} primaryTypographyProps={{ style: {color:'black'} }} />
                </ListItemButton>
            </ListItem>
            ))
            }   
      </List>

      <Fab variant="extended" color="primary" aria-label="add" onClick={saveHandler}>
                Save
        </Fab>
    </div>
  )
}
