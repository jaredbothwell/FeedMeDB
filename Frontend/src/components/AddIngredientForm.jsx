import { Autocomplete, Fab, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './css_files/Ingredient.css'
export default function AddIngredientForm({sendIngredientToParent}) {

    const [ingredients,setIngredients] = useState([]);
    const [measurements,setMeasurements] = useState([]);
    const [submitIsEnabled,setSubmitIsEnabled] = useState(false);
    const [values, setValues] = useState({
        ingredient: null,
        quantity: null,
        measurement: null,
      });

    const handleChange = (event) => {
    setValues({
        ...values,
        [event.target.name]: event.target.value,
    });
    };

    const handleSubmit = () =>
    {
        let d = 
        {
            name: values.ingredient,
            measurement: values.measurement,
            measurementQuantity: parseInt(values.quantity)
        };
        sendIngredientToParent(d);
    }

    useEffect(()=>
    {
        if(values.ingredient !== null && values.quantity !== null && values.measurement !== null){
            setSubmitIsEnabled(true);
        }
        else
        {
            if(submitIsEnabled)
            {
                setSubmitIsEnabled(false);
            }
            
        }
        
    },[values])

    
    useEffect(()=>
    {
      fetch(
        "http://localhost:8000/api/ingredients")
        .then((res) => res.json())
        .then((json) => {
          setIngredients(json);
        })

    fetch(
        "http://localhost:8000/api/units")
        .then((res) => res.json())
        .then((json) => {
            setMeasurements(json);
        })
    }, [])
  return (
    <div className='form_container1'>
        <h2 className='add-ingredient-h2'>Add Ingredient</h2>
            <Autocomplete   
            onChange={(event, value) =>     
            setValues({
                ...values,
                ingredient: value,
            })}
            sx={{ width: 320, marginBottom: 3 }}
            id="free-solo-demo"
            freeSolo
            options={ingredients.map((option) => option.name)}
            renderInput={(params) => <TextField name='ingredient' onChange={handleChange} {...params} label="Ingredient Name" />}
        />
        <div className='vertical_row'>
        <TextField
          name='quantity'
          sx={{ width: 100}}
          onChange={handleChange}
          id="outlined-number"
          label="Quantity"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Autocomplete
            sx={{ width: 200, marginLeft: 2}}
            onChange={(event, value) =>     
                setValues({
                    ...values,
                    measurement: value,
                })}
            id="free-solo-demo"
            options={measurements}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Measurement" />}
        />
        </div>
        <div className='input_field1'>
        <Fab disabled={!submitIsEnabled} variant="extended" color="primary" aria-label="add" onClick={handleSubmit}>
        &nbsp;&nbsp;Add Ingredient&nbsp;&nbsp;
        </Fab>
        </div>
    </div>
  )
}
