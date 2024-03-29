import React,{useState, useEffect} from 'react'
import AnimatedPage from './AnimatedPage'
import './css_files/Search.css'
import RecipeCard from '../components/Card' 
import { Backdrop, CircularProgress } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterIngredientsSearch from '../components/FilterIngredientsSearch';
import SearchBar from '../components/SearchBar';
import chocolate from "../images/burger.jpg"

const styles = {

    backgroundImage: `url(${chocolate})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
  
}

export default function Search() {
  const [filterBackdrop,setFilterBackdrop] = useState(false);
  
  const [recipes, setRecipes] = useState([]);

  const [ingredientsToFilterBy,setIngredientsFilter] = useState('');
  const [query, setQuery] = useState("");

  useEffect(() => {
    var lookUpString = '';
    if(query === '')
    {
      lookUpString = '%00'
    }
    else
    {
      lookUpString = query
    }

    if(ingredientsToFilterBy !== '')
    {

      fetch(
        "http://localhost:8000/api/recipes/search?ingredients=" + ingredientsToFilterBy + "&name=" + lookUpString )
        .then((res) => res.json())
        .then((json) => {
          setRecipes(json);
        })
    }
    else if(query === '')
    {

      fetch(
        "http://localhost:8000/api/recipes")
        .then((res) => res.json())
        .then((json) => {
          console.log(json[0]);
          setRecipes(json);
        })
    }
    else
    {

      fetch(
        "http://localhost:8000/api/recipes/query/" + query)
        .then((res) => res.json())
        .then((json) => {
          setRecipes(json);
        })
    }
  }, [query,ingredientsToFilterBy]);

  //send filter ingredients to parent
  const closeFilter = (filteredIngredients) => 
  {
    setIngredientsFilter(filteredIngredients)
    setFilterBackdrop(false);
  }

  return (
    <AnimatedPage >
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={filterBackdrop}>
            <FilterIngredientsSearch SendIngredientsToHomePage={closeFilter}/>
        </Backdrop>

    <section className='home--search'  >
      <div className='container' >
        <div className='row justify-content-center'>
          <h1 style={{marginTop: '20px'}}  className='label'>Look up a recipe</h1>
        </div>
        <div style={{marginTop: '20px'}} className='row justify-content-center'>
          <div>
            <SearchBar
              sendQuery={(str)=>{setQuery(str)}}
              />
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
      <div className='home--recipes' delay={100}>
        {recipes.length > 0?
          recipes.map((recipe) => (
          <RecipeCard data={recipe} key={recipe.id}/>
          ))
          :
          <CircularProgress size="5rem"/> 
        }
      </div>

    </section>
    </AnimatedPage>
  )
}