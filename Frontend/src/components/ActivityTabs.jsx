import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function TopContrPanel(props) {
  const { children, value, index, data, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && data !== null ? (
        <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 300 }}
            id="style-2"
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>UserName</TableCell>
                  <TableCell align="center">Total Ratings</TableCell>
                  <TableCell align="center">Average Rating</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.UserName}
                    </TableCell>
                    <TableCell align="center">{row.TotalRatings}</TableCell>
                    <TableCell align="center">{row.AverageRating}/5</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
          >
            <CircularProgress size="5rem" />{" "}
          </div>
        </>
      )}
    </div>
  );
}

function TopRecipePanel(props) {
  const { children, value, index, data, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && data !== null ? (
        <Box sx={{ p: 3 }}>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 300 }}
            id="style-2"
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Recipe</TableCell>
                  <TableCell align="center">Average Rating</TableCell>
                  <TableCell align="center">Creator</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.Name}
                    </TableCell>
                    <TableCell align="center">{row.AverageRating}/5</TableCell>
                    <TableCell align="center">{row.UserName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
          >
            <CircularProgress size="5rem" />{" "}
          </div>
        </>
      )}
    </div>
  );
}

function MostActivePanel(props) {
  const { children, value, index, data, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && data !== null ? (
        <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 300, maxWidth: "50%" }}
            id="style-2"
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>UserName</TableCell>
                  <TableCell align="right">Interactions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.UserName}
                    </TableCell>
                    <TableCell align="right">
                      {row.CountRecipesInteractedWith}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
          >
            <CircularProgress size="5rem" />{" "}
          </div>
        </>
      )}
    </div>
  );
}

function TopIngredients(props) {
  const { children, value, index, data, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && data !== null ? (
        <Box sx={{ p: 3, display: "flex", justifyContent: "center" }}>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: 300, maxWidth: "50%" }}
            id="style-2"
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Ingredient</TableCell>
                  <TableCell align="center"># Of Recipes Used In</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.Name}
                    </TableCell>
                    <TableCell align="center">{row.IngredientCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        <>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
          >
            <CircularProgress size="5rem" />{" "}
          </div>
        </>
      )}
    </div>
  );
}

TopContrPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
TopRecipePanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
MostActivePanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
TopIngredients.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [topContributers, setTopContributers] = useState(null);
  const [topRecipes, setTopRecipes] = useState(null);
  const [mostActive, setMostActive] = useState(null);
  const [topIngredients, setTopIngredients] = useState(null);

  React.useEffect(() => {
    fetch("http://localhost:8000/api/aggregate/top-users")
      .then((res) => res.json())
      .then((json) => {
        if (json.length > 0) setTopContributers(json);
      });

    fetch("http://localhost:8000/api/aggregate/top-recipes")
      .then((res) => res.json())
      .then((json) => {
        if (json.length > 0) {
          console.log("hi jared");
          console.log(json);
          setTopRecipes(json);
          console.log("bye jared jared");
        }
      });

    fetch("http://localhost:8000/api/aggregate/most-active-users")
      .then((res) => res.json())
      .then((json) => {
        if (json.length > 0) setMostActive(json);
      });

    fetch("http://localhost:8000/api/aggregate/most-common-ingredients")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.length > 0) setTopIngredients(json);
      });
  }, []);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label={
              <span style={{ color: "white", fontSize: 20 }}>
                Top Contributers
              </span>
            }
            {...a11yProps(0)}
          />
          <Tab
            label={
              <span style={{ color: "white", fontSize: 20 }}>Top Recipes</span>
            }
            {...a11yProps(1)}
          />
          <Tab
            label={
              <span style={{ color: "white", fontSize: 20 }}>
                Most Active Users
              </span>
            }
            {...a11yProps(2)}
          />
          <Tab
            label={
              <span style={{ color: "white", fontSize: 20 }}>
                Most Common Ingredients
              </span>
            }
            {...a11yProps(3)}
          />
        </Tabs>
      </Box>
      <TopContrPanel
        data={topContributers}
        value={value}
        index={0}
      ></TopContrPanel>
      <TopRecipePanel
        data={topRecipes}
        value={value}
        index={1}
      ></TopRecipePanel>
      <MostActivePanel
        data={mostActive}
        value={value}
        index={2}
      ></MostActivePanel>

      <TopIngredients
        data={topIngredients}
        value={value}
        index={3}
      ></TopIngredients>
    </Box>
  );
}
