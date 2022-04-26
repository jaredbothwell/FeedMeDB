import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip } from '@mui/material';
import { useNavigate } from "react-router-dom";

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

  function handleCardClick()
  {
    navigate("/recipe/?recipeId=" + recipe_data.recipeID + "&name=" + recipe_data.name);
  }


  return (
    <Card sx={{ minWidth: 275, maxWidth: 200, maxHeight:300, margin: 2 }}>
        <CardActionArea onClick={handleCardClick}>
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
                recipe_data.ingredients.map((ingredient) => (<Chip style={{margin: 2}} label={ingredient} color="info" />))
              }
            </div>

            </CardContent>
        </CardActionArea>
    </Card>
  );
}