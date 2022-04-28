import React,{useState} from 'react'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Backdrop, IconButton } from '@mui/material';
import MyRecipes from './MyRecipes';

export default function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [myRecipes,setMyRecipes] = useState(false);
  const [savedRecipes,enableSaved] = useState(false);
  return (
      
    <div>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={myRecipes}>
          <MyRecipes closeForm={()=>{setMyRecipes(false)}}/>
        </Backdrop>

      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar sx={{ width: 40, height: 40 }}></Avatar>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >

        <MenuItem onClick={()=>{setMyRecipes(true);handleClose();}}>My Recipes</MenuItem>
        <MenuItem onClick={handleClose}>BookMarked Recipes</MenuItem>
        <MenuItem onClick={()=>{
          localStorage.setItem('user_id',null);
          handleClose();}}>Logout</MenuItem>
      </Menu>
    </div>
  );
}