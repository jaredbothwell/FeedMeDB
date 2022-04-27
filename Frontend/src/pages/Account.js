import React,{useEffect, useState} from 'react'
import AnimatedPage from './AnimatedPage'
import Backdrop from '@mui/material/Backdrop';
import ListBox from '../components/ListBox';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CreateRecipeForm from '../components/CreateRecipeForm';

export default function Account(props) {
  //console.log(props.user)

  const [backDropOpen, setBackDrop] = useState(false);

  const [user,setUser] = useState(null);

  const handleClose = () => {
    setBackDrop(false);
  };
  const handleToggle = () => {
    setBackDrop(!backDropOpen);
  };

  useEffect(()=>
  {
    const user_id = localStorage.getItem('user_id');
    if(user_id != null)
    {
      fetch(
        "http://localhost:8000/api/users/" + user_id)
        .then((res) => res.json())
        .then((json) => {
          setUser(json);
        })
    }

  })

  return (
    <AnimatedPage>
      {user != null?<>
          <div class="row"
            style={{marginTop: "1%"}}>
            <div class="col"
            style={{
              borderRadius: '40px',
              backgroundColor: '#565c68',
              opacity: '80%',
              padding:'5%',
              marginLeft: '1%',
              marginRight: '1%'}}>
                <h1 style={{textAlign: "center"}}>Recipes that {user.name} has contributed</h1>
                <ListBox/>
            <Fab className='col-m-1' variant="extended" color="primary" aria-label="add" onClick={handleToggle}>
              <AddIcon sx={{ mr: 1 }} />
                Create new recipe
            </Fab>
            </div>
            <div class="col"
            style={{
              borderRadius: '40px',
              backgroundColor: '#565c68',
              opacity: '80%',
              padding:'5%',
              marginLeft: '1%',
              marginRight: '1%'}}>
                <h1 style={{color:'white', textAlign:'center'}}>{user.name} stats:</h1>
            </div>
            <div class="col"
            style={{
              borderRadius: '40px',
              backgroundColor: '#565c68',
              opacity: '80%',
              padding:'5%',
              marginLeft: '1%',
              marginRight: '1%'}}>
                <h1 style={{textAlign: "center"}}>Recipes that {user.name} has bookmarked/saved</h1>
                <ListBox/>
            </div>
          </div>

          <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backDropOpen}
        
      >
        <CreateRecipeForm closeHandler={()=>setBackDrop(false)}/>
      </Backdrop>
      </>
      :
      <h1 style={{color:'white', textAlign:'center'}}>please log in</h1> 
      }
    </AnimatedPage>
  )
}
