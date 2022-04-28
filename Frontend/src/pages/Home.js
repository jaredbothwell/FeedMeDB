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
import recipes1 from '../mock_data/recipes';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [filterBackdrop,setFilterBackdrop] = useState(false);
  
  const [recipes, setRecipes] = useState([]);

  const [ingredientsToFilterBy,setIngredientsFilter] = useState('');
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(() => sendQuery(), 500);
    return () => clearTimeout(timeOutId);
  }, [query,ingredientsToFilterBy]);

  //send filter ingredients to parent
  const closeFilter = (filteredIngredients) => 
  {
    setIngredientsFilter(filteredIngredients)
    setFilterBackdrop(false);
  }

  let lookUpString = '';
  if(query === '')
  {
    lookUpString = '%00'
  }
  else
  {
    lookUpString = query
  }

  const sendQuery = () =>
  {
    if(ingredientsToFilterBy !== '')
    {
      fetch(
        "http://localhost:8000/api/recipes/search?ingredients=" + ingredientsToFilterBy + "&name=" + lookUpString )
        .then((res) => res.json())
        .then((json) => {
          setRecipes(json);
        })
    }
    else
    {
      fetch(
        "http://localhost:8000/api/recipes/query/" + lookUpString)
        .then((res) => res.json())
        .then((json) => {
          setRecipes(json);
        })
    }
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
            <SearchBar
              inputProps={{ style: { color: "white" } }}
              label='Search'
              value={query}
              onChange={event => setQuery(event.target.value)}/>
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
        {
          recipes.map((recipe) => (
          <RecipeCard data={recipe} key={recipe.id}/>
          ))
        }
      </div>

    </section>
    </AnimatedPage>
  )
}