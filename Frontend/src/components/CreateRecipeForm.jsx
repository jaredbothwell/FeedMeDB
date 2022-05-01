import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import './css_files/CreateRecipeForm.css'
import { Backdrop, Fab, Slider } from '@mui/material';
import IngredientTable from './IngredientTable';
import AddIngredientForm from './AddIngredientForm';
export default function CreateRecipeForm({closeHandler}) {

  // ==== data grid stuff =====

  const [ingredients,setIngredients] = useState([])
  const [ingredientFormOpen, setIngredientForm] = useState(false);
  const [uniqueKey,incrementKey] = useState(0);

  const handleAddIngredient = (data) =>
  {
    data['key'] = uniqueKey;
    incrementKey(uniqueKey+1);
    setIngredients(ingredients.concat(data));
    setIngredientForm(false);
  }

  const handleRemoveIngredient = (key) =>
  {
    setIngredients(ingredients.filter((item) => item.key !== key))
  }

  // =========================


  
  const inputRef = React.useRef(null)

  // ===== submit data ============
  const submitHandler = () =>
  {
    var temp_ingredients = []

    const user_id = localStorage.getItem('user_id');

    for(var i = 0; i < ingredients.length;i++)
    {
      temp_ingredients.push(
        {
          name: ingredients[i].name,
          measurementUnitID: ingredients[i].measurement.measurementUnitID,
          measurementQuantity: ingredients[i].measurementQuantity
        })
    }

    let data = 
    {
      createdByID:user_id,
      name: values.recipeName,
      prepTime:values.prepTime,
      difficulty:values.difficulty,
      directions:values.directions,
      ingredients: temp_ingredients
    }

    let http_string = "http://localhost:8000/api/recipes/add"
    console.log(http_string)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch(http_string, requestOptions)
      .then(response => console.log(response))


    closeHandler()
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
          <h2 style={{color:'black', alignSelf:'center'}}>Create a new recipe</h2>
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
                Add Recipe
        </Fab>
        </div>
      </div>
  )
}
