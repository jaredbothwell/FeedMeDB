import React,{useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Backdrop, CardActionArea, Chip } from '@mui/material';
import { useNavigate } from "react-router-dom";
import DisplayRecipe from './DisplayRecipe';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard(props) {
  const navigate = useNavigate();
  //TODO - bring data in here json
  const recipe_data = props.data

  const [showRecipe,setShowRecipe] = useState(false);



  return (
    <Card sx={{ minWidth: 275, maxWidth: 200, maxHeight:300, margin: 2 }}>
              <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={showRecipe}>
            <DisplayRecipe recipeid={recipe_data.id} isClicked={showRecipe} handleClose={()=>setShowRecipe(false)}/>
          </Backdrop>
        <CardActionArea onClick={()=>setShowRecipe(true)}>
            <CardContent>
            <Typography variant="h6" gutterBottom component="div">
                {recipe_data.name}
            </Typography>
            <div style={{ overflow: "auto", maxHeight: 75}}>
              <Typography variant="body1" color="text">
                {recipe_data.directions}
              </Typography>
            </div>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Creator: feedmeDB
            </Typography>
            <div style={{ overflow: "auto", maxHeight: 75}}>
              {
                recipe_data.ingredients.map((ingredient) => (<Chip key={ingredient.id} style={{margin: 2}} label={ingredient.name} color="info" />))
              }
            </div>
            </CardContent>
        </CardActionArea>
    </Card>
  );
}