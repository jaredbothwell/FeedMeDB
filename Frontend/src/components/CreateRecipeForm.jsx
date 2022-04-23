import React from 'react'
import TextField from '@mui/material/TextField';
import './css_files/CreateRecipeForm.css'
import { Fab, Slider } from '@mui/material';
import PropTypes from 'prop-types';

import NumberFormat from 'react-number-format';
export default function CreateRecipeForm({closeHandler}) {

  const inputRef = React.useRef(null)

  const submitHandler = () =>
  {
    console.log(values.description)
    console.log(values.difficulty)
    console.log(values.prepTime)
    console.log(values.recipeName)

    resetState()
    closeHandler()
  }

  const cancel = () =>
  {
    resetState()
    closeHandler()
  }

  const resetState = () => 
  {
    setValues({
      ...values,
      recipeName: '',
      prepTime: '',
      difficulty: 1,
      description: ''
    }
    )

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

  // ========================= number formatting stuff =================================
  const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        isNumericString
      />
    );
  });
  
  NumberFormatCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  const [values, setValues] = React.useState({
    recipeName: '',
    prepTime: '',
    difficulty: 1,
    description: ''
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

    
    <div className='form_container'>
          <h2 style={{color:'black'}}>Create a new recipe</h2>
          <div className='input_field'>
            <TextField
              label="Recipe Name"
              variant="standard"
              name='recipeName'
              onChange={handleChange}
              value={values.recipeName}
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
            <TextField
        label="Prep Time (in minutes)"
        value={values.prepTime}
        onBlur={handleChange}
        name="prepTime"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumberFormatCustom,
        }}
        variant="standard"
      />
          <div className='input_field'>
            <TextField
            name='description'
            id="outlined-multiline-flexible"
            label="Description"
            onChange={handleChange}
            multiline
            maxRows={4}
            value={values.description}
          />
        </div>



        <div className='input_field'>
        <Fab style={{backgroundColor: 'gray'}} variant="extended" color="primary" aria-label="add" onClick={cancel}>
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
