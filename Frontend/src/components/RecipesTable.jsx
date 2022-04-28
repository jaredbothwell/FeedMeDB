import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';






function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function RecipesTable() {

    const [recipes, setRecipes] = useState([]);

    useEffect(()=>
    {
      const user_id = localStorage.getItem('user_id');
      if(user_id != null)
      {
        fetch(
          "http://localhost:8000/api/recipes/createdby/" + user_id)
          .then((res) => res.json())
          .then((json) => {
            setRecipes(json);
            console.log(json)
          })
      }
  
    },[])



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Recipe</TableCell>
            <TableCell align="center">Created On</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recipes.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.createdOn.substring(0,10)}</TableCell>
              <TableCell align="right">
                    <IconButton
                        aria-label="expand row"
                        size="small"

                        >
                        <EditIcon/>
                    </IconButton>
              </TableCell>
              <TableCell align="right">
                    <IconButton
                        aria-label="expand row"
                        size="small"

                        >
                        <DeleteIcon/>
                    </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}