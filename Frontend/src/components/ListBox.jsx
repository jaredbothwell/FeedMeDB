import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';

export default function ListBox() {

<List style={{maxHeight: '100%', overflow: 'auto'}} />
  return (
    <List dense sx={{ width: '100%', maxHeight: 200,overflow: 'auto' }}>
      {[0, 1, 2, 3,1,1,11,1,1,1,11,,1,1,1,1,1,1,1].map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={value}
            disablePadding
          >
            <ListItemButton>
              <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}