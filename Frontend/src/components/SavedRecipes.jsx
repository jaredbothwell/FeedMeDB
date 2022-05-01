import './css_files/Ingredient.css'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Backdrop, Fab, IconButton, Typography } from '@mui/material';

export default function SavedRecipes({closeForm}) {


    const data = [{name:'same'},{name:'same2'}]
  return (
    <div className='form_container1'>
    <Typography gutterBottom variant="h4" className='Display_Recipe_Text'>
          Saved Recipes
      </Typography>
      <TableContainer component={Paper}>
    <Table sx={{ minWidth: 500 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">Recipe</TableCell>
          <TableCell align="center">Saved</TableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell align="center" component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell  align="center">
                  <IconButton
                      aria-label="expand row"
                      size="small"

                      >
                      <BookmarkIcon/>
                  </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <div className='input_field'>
  <Fab sx={{width:120, backgroundColor: 'gray', marginLeft:2}} onClick={closeForm} variant="extended" color="primary" aria-label="add">
              Close
      </Fab>

  </div>

  </div>
  )
}
