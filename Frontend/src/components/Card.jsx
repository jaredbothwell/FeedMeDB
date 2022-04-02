import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function BasicCard(props) {
  return (
    <Card sx={{ minWidth: 275, maxWidth: 200, margin: 2 }}>
        <CardActionArea>
            <CardContent>
            <Typography variant="h6" gutterBottom component="div">
                {props.name}
            </Typography>
            <Typography variant="body1" color="text">
                This impressive paella is a perfect party dish and a fun meal to cook
                together with your guests. Add 1 cup of frozen peas along with the mussels,
                if you like.
            </Typography>

            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Creator: feedmeDB
            </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
  );
}