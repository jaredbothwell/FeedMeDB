import "./css_files/Ingredient.css";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Backdrop, Fab, IconButton, Typography } from "@mui/material";
import CreateRecipeForm from "./CreateRecipeForm";
import EditRecipeForm from "./EditRecipeForm";

export default function MyRecipes({ closeForm }) {
  const [recipes, setRecipes] = useState([]);
  const [recipeToEdit, setRecipeToEdit] = useState(null);
  const [createRecipeBackdrop, setCreateRecipeBackdrop] = useState(false);
  const [uniqueKey, incrementKey] = useState(0);

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (user_id != null) {
      fetch("http://localhost:8000/api/recipes/createdby/" + user_id)
        .then((res) => res.json())
        .then((json) => {
          let temp = json;
          setRecipes(temp);
        });
    }
  }, [uniqueKey, recipeToEdit]);

  const deleteRecipe = (id) => {
    console.log(id);

    let http_string = "http://localhost:8000/api/recipes/remove?id=" + id;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "React POST Request Example" }),
    };
    fetch(http_string, requestOptions).then((response) =>
      console.log(response)
    );
    incrementKey(uniqueKey + 1);
  };

  return (
    <div className="form_container1">
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={createRecipeBackdrop}
      >
        <CreateRecipeForm
          key={uniqueKey}
          closeHandler={() => {
            setCreateRecipeBackdrop(false);
            incrementKey(uniqueKey + 1);
          }}
        />
      </Backdrop>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={recipeToEdit !== null}
      >
        <EditRecipeForm
          key={uniqueKey}
          closeHandler={() => {
            setRecipeToEdit(null);
            incrementKey(uniqueKey + 1);
          }}
          recipeData={recipeToEdit}
        />
      </Backdrop>
      <Typography gutterBottom variant="h4" className="Display_Recipe_Text">
        My Recipes
      </Typography>
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
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">
                  {row.createdOn.substring(0, 10)}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => setRecipeToEdit(row)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => deleteRecipe(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="input_field">
        <Fab
          onClick={() => setCreateRecipeBackdrop(!createRecipeBackdrop)}
          variant="extended"
          color="primary"
          aria-label="add"
        >
          Add Recipe
        </Fab>
        <Fab
          sx={{ width: 120, backgroundColor: "gray", marginLeft: 2 }}
          onClick={closeForm}
          variant="extended"
          color="primary"
          aria-label="add"
        >
          Close
        </Fab>
      </div>
    </div>
  );
}
