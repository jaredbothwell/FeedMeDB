import React, { useState } from 'react'
import './css_files/CreateRecipeForm.css'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Fab, List } from '@mui/material';
import ingredients from '../mock_data/ingredients';


export default function FilterIngredientsSearch(props) {

    const [filterIngredientsList,setFilterIngredientsList] = useState([])
    const [availableIngrdients,setAvailable] = useState(ingredients)


    const addToSearchFilter = (ingredient) => 
    {
        setFilterIngredientsList(filterIngredientsList.concat(ingredient))
        
        const newList = availableIngrdients.filter((item) => item.Name !== ingredient.Name);

        setAvailable(newList);
    }

    const removeFromSearchFilter = (ingredient) =>
    {
        setAvailable(availableIngrdients.concat(ingredient))
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
                        <ListItemText primary={ingredient.Name} primaryTypographyProps={{ style: {color:'black'} }} />
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
            availableIngrdients.map((ingredient) => (
                <ListItem key={ingredient.IngredientID} component="div" disablePadding>
                <ListItemButton onClick={() => addToSearchFilter(ingredient)}>
                <ListItemText primary={ingredient.Name} primaryTypographyProps={{ style: {color:'black'} }} />
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
