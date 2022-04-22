import React from 'react'
import AnimatedPage from './AnimatedPage'

import ListBox from '../components/ListBox';

import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function Account(props) {
  console.log(props.user)
  return (
    <AnimatedPage>
      {props.user != null?<>
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
                <h1 style={{textAlign: "center"}}>Recipes that {props.user.name} has contributed</h1>
                <ListBox/>
                <Fab className='col-m-1' variant="extended" color="primary" aria-label="add">
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
                <h1 style={{color:'white', textAlign:'center'}}>{props.user.name} stats:</h1>
            </div>
            <div class="col"
            style={{
              borderRadius: '40px',
              backgroundColor: '#565c68',
              opacity: '80%',
              padding:'5%',
              marginLeft: '1%',
              marginRight: '1%'}}>
                <h1 style={{textAlign: "center"}}>Recipes that {props.user.name} has bookmarked/saved</h1>
                <ListBox/>
            </div>
          </div>
        
      </>
      
      
      :
      <h1 style={{color:'white', textAlign:'center'}}>please log in</h1> }

  
    </AnimatedPage>
  )
}
