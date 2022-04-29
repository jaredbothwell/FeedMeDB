import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import './css_files/CreateRecipeForm.css'
import { Backdrop, Fab, Slider } from '@mui/material';
import IngredientTable from './IngredientTable';
import AddIngredientForm from './AddIngredientForm';
export default function EditRecipeForm({closeHandler, recipeData}) {

  // ==== data grid stuff =====

  const [ingredients,setIngredients] = useState([])
  const [ingredientFormOpen, setIngredientForm] = useState(false);
  const [uniqueKey,incrementKey] = useState(0);
  const [idsToRemove,setIdsToRemove] = useState([]);
  const [uniqueIds,setUnqID] = useState([]);

  const handleAddIngredient = (data) =>
  {
    data['key'] = generateID();
    data['tempDeleteID'] = -1;
    incrementKey(uniqueKey+1);
    setIngredients(ingredients.concat(data));
    setIngredientForm(false);
  }

  const generateID = () =>
  {
    var unqID = Math.floor(Math.random() * 100000);
    let temp_ids = [...uniqueIds]

    while(temp_ids.includes(unqID))
    {
      unqID = Math.floor(Math.random() * 100000);
    }
    temp_ids.push(unqID);
    setUnqID(temp_ids);
    console.log(temp_ids)
    return(unqID);
  }

  const generateMultipleIDs = (ingredients) =>
  {
    var unqID = 0;
    var temp_ids = []
    for(var i = 0; i < ingredients.length;i++)
    {
      unqID = Math.floor(Math.random() * 100000);
      while(temp_ids.includes(unqID))
      {
        unqID = Math.floor(Math.random() * 100000);
      }
      temp_ids.push(unqID);
      ingredients[i]["key"] = unqID;
    }

    setUnqID(temp_ids);
    //return(ingredients);
  }

  const handleRemoveIngredient = (key) =>
  {
    var temp = [...idsToRemove];
    for(var i = 0; i < ingredients.length;i++)
    {
      if(ingredients[i].key === key && ingredients[i].tempDeleteID !== -1)
      {
        temp.push(ingredients[i].tempDeleteID);
      }
    }
    setIdsToRemove(temp);
    setIngredients(ingredients.filter((item) => item.key !== key))
  }

  // ===== submit data ============
  const submitHandler = () =>
  {
    var temp_ingredients = []

    const user_id = localStorage.getItem('user_id');

    for(var i = 0; i < ingredients.length;i++)
    {

      temp_ingredients.push(
        {
          Name: ingredients[i].name,
          MeasurementUnitID: ingredients[i].measurement.measurementUnitID,
          MeasurementQuantity: ingredients[i].measurementQuantity
        })
    }
    

    let data = 
    {
      ingredientIDs:idsToRemove,
      recipe:
      {
        ID:recipeData.id,
        CreatedByID:parseInt(user_id),
        Name: values.recipeName,
        PrepTime:parseInt(values.prepTime),
        Difficulty:values.difficulty,
        Directions:values.directions,
        Ingredients: temp_ingredients
      }
    }
    console.log(data);

   
    let http_string = "http://localhost:8000/api/recipes/edit"
    console.log(http_string)
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch(http_string, requestOptions)
      .then(response => closeHandler())
      
    
  }


  const marks = [
    {
      value: 1,
      label: '1',
    },
    {
      value: 2,
      label: '2',
    },
    {
      value: 3,
      label: '3',
    },
    {
      value: 4,
      label: '4',
    },
    {
      value: 5,
      label: '5',
    }
  ];

  //idk
  function valuetext(value) {
    return `${value}`;
  }

  const [values, setValues] = React.useState({
    recipeName: '',
    prepTime: '',
    difficulty: 1,
    directions: ''
  });

  useEffect(()=>
  {
    console.log(recipeData);
    if(recipeData !== null)
    {
      
      setValues({
        ...values,
        recipeName: recipeData.name,
        prepTime: recipeData.prepTime,
        difficulty: recipeData.difficulty,
        directions: recipeData.directions
      })

      setIngredients(loadIngredients());
    }
  },[recipeData])

  const loadIngredients = () =>
  {
    var tempIngredients = [];
    console.log("ingredients");

    console.log(recipeData.ingredients);
    recipeData.ingredients.forEach(ingredient => 
      
      {
        tempIngredients.push(
          {
            tempDeleteID: ingredient.ingredientID,
            name: ingredient.name,
            measurementQuantity: ingredient.measurementQuantity,
            measurement: 
            {
              name: ingredient.measurementUnitName,
              measurementUnitID: ingredient.measurementUnitID
            }
          });
      });

      generateMultipleIDs(tempIngredients);
      console.log(tempIngredients);

    return(tempIngredients);
  }

  const [submitEnabled,setSubmit] = React.useState(false)

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  React.useEffect(() => {
    if(values.recipeName != '' & values.prepTime > 0)
    {
      setSubmit(true)
    }
    else
    {
      setSubmit(false)
    }
  }, [values]);

  return (

    
    <div className='form_container2'>
      <Backdrop open={ingredientFormOpen} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <AddIngredientForm key={uniqueKey} sendIngredientToParent={data => handleAddIngredient(data)}/>
      </Backdrop>
          <h2 style={{color:'black', alignSelf:'center'}}>Edit</h2>
          <hr
        style={{
            color: 'lightgray',
            backgroundColor: 'lightgray',
            height: 1,
            marginTop: 5,
            marginBottom: 20

        }}
        
        />
          <div className='vertical_row'>
            <TextField
              sx={{ width: 300}}
              label="Recipe Name"
              variant="standard"
              name='recipeName'
              onChange={handleChange}
              value={values.recipeName}
              />


              
            <TextField
                      name="prepTime"
                      sx={{ width: 100, marginLeft: 10}}
                      onChange={handleChange}
                      id="standard-number"
                      label="Prep Time"
                      value={values.prepTime}
                      type="number"
                      helperText="(In minutes)"
                      variant='standard'
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />


          </div>
          <h3 className='input_field' style={{color:'black'}}>difficulty</h3>
          <Slider
        name='difficulty'
        aria-label="Custom marks"
        defaultValue={1}
        getAriaValueText={valuetext}
        max={5}
        min={1}
        step={1}
        valueLabelDisplay="auto"
        marks={marks}
        onChange={handleChange}
        value={values.difficulty}
      />

          <div className='input_field'>
            <TextField
            sx={{width:500}}
            name='directions'
            id="outlined-multiline-flexible"
            label="directions"
            onChange={handleChange}
            multiline
            rows={4}

            value={values.directions}
          />
        </div>

        <div className='input_field'>
          Ingredients
        </div>

        


        <IngredientTable ingredientsList={ingredients} removeIngredient={prop=>handleRemoveIngredient(prop)} addIngredient={()=>setIngredientForm(true)}/>
        <div className='input_field'>
        <Fab style={{backgroundColor: 'gray'}} variant="extended" color="primary" aria-label="add" onClick={()=>closeHandler()}>
                Cancel
        </Fab>
        </div>
        <div className='input_field'>
        <Fab disabled={!submitEnabled} variant="extended" color="primary" aria-label="add" onClick={submitHandler}>
                Finish Edit
        </Fab>
        </div>
      </div>
  )
}
