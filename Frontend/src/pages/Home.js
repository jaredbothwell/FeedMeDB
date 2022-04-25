import React,{useState, useEffect} from 'react'
import AnimatedPage from './AnimatedPage'
import './css_files/Home.css'
import Search from '../components/SearchBar'
import SmoothList from 'react-smooth-list';
import RecipeCard from '../components/Card' 
import { Backdrop, TextField } from '@mui/material';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterIngredientsSearch from '../components/FilterIngredientsSearch';
import recipes from '../mock_data/recipes';

export default function Home() {

  // turn this into a component
  const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#e1cfa9',
      },
      '& label': {
        color: 'white',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'yellow',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
        },
        '&:hover fieldset': {
          borderColor: 'white',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#e1cfa9',
        },
      },
    },
  })(TextField);

  const [recipes, setRecipes] = useState([]);


  const [filterBackdrop,setFilterBackdrop] = useState(false);
  const [ingredientsToFilterBy,setIngredientsFilter] = useState([]);


  const closeFilter = (filteredIngredients) => 
  {
    setIngredientsFilter(filteredIngredients)
    setFilterBackdrop(false);
  }

  useEffect(()=>
  {
    fetch(
      "http://localhost:8000/api/recipes")
      .then((res) => res.json())
      .then((json) => {
        console.log(json[0]);
        setRecipes(json);
      })
  }, [])

  return (
    <AnimatedPage>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={filterBackdrop}>
            <FilterIngredientsSearch SendIngredientsToHomePage={closeFilter}/>
        </Backdrop>

    <section className='home--search'>
      <div className='container'>
        <div className='row justify-content-center'>
          <h1 style={{marginTop: '20px'}}  className='label'>Look up a recipe</h1>
        </div>
        <div style={{marginTop: '20px'}} className='row justify-content-center'>
          <div>
            <CssTextField inputProps={{ style: { color: "white" } }} label='Search'/>
            <IconButton onClick={()=>setFilterBackdrop(true)}>
              <FilterAltIcon fontSize='large' sx={{ color: 'white'}}/>
            </IconButton>
          </div>
        </div >
        <div className='row justify-content-center'>
        </div>
       </div>
    </section>

    <section>
      <SmoothList className='home--recipes' delay={100}>
        {
          recipes.map((recipe) => (
          <RecipeCard data={recipe} key={recipe.id}/>
          ))
        }
      </SmoothList>

    </section>
    </AnimatedPage>
  )
}