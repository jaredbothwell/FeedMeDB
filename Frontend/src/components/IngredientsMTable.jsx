import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function IngredientsMTable({ingredientsList}) {

    React.useEffect(()=>{
        console.log(ingredientsList)
    },[ingredientsList])

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>     
            <TableCell>Ingredient</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Unit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ingredientsList.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.measurementQuantity}</TableCell>
                <TableCell align="right">{row.measurementUnitName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}