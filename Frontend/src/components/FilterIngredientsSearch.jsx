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
        filterIngredients(json);
        setAvailable(json);
      })
  }, [])
    const [filteredIngredients,filterIngredients] = useState([])
    const [queryIngredients,setQueryIngredientsList] = useState([])
    const [availableIngredients,setAvailable] = useState([])
    const [searchQuery,setQuery] = useState(null);
    

    useEffect(() => {
      if(searchQuery != null)
      {
        const timeOutId = setTimeout(() => filterIngredients(availableIngredients.filter(ingredient => ingredient.name.includes(searchQuery))), 1000);
        return () => clearTimeout(timeOutId);
      }
    }, [searchQuery]);
    
    const addToSearchFilter = (ingredient) => 
    {
        if(!queryIngredients.includes(ingredient))
        {
          setQueryIngredientsList(queryIngredients.concat(ingredient))
        }
    }

    const removeFromSearchFilter = (ingredient) =>
    {
        const newList = queryIngredients.filter((item) => item !== ingredient);
        setQueryIngredientsList(newList);
    }

    const saveHandler = () =>
    {
        var ingredients_array = [];

        queryIngredients.map((ingredient)=>
        {
          ingredients_array.push(ingredient.name)
        })

        if(ingredients_array.length === 0)
        {
          props.SendIngredientsToHomePage('');
        }
        else
        {
          props.SendIngredientsToHomePage(ingredients_array.join(','));
        }
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
            queryIngredients.map((ingredient) => (
            <ListItem key={ingredient.id} component="div" disablePadding>
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
                <ListItem key={ingredient.id} component="div" disablePadding>
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
