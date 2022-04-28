import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';

export default function BasicTable({ingredientsList, removeIngredient,addIngredient}) {

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow> 
          <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        color='primary'
                        onClick={()=>addIngredient()}
                        >
                          <div style={{display:'flex', flexDirection:'column'}}>
                          <AddCircleIcon style={{alignSelf:'center'}}/>
                            Add
                          </div>

                    </IconButton>
            </TableCell>           
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
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={()=>removeIngredient(row.key)}
                        >
                        <DeleteIcon/>
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">{row.name}</TableCell>
                <TableCell align="right">{row.measurementQuantity}</TableCell>
                <TableCell align="right">{row.measurement.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}