import { TextField } from '@mui/material';
import { withStyles } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: '#e1cfa9',
    },
    '& label': {
      color: 'white',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'yellow',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#e1cfa9',
      },
    },
  },
})(TextField);


export default function SearchBar({sendQuery}) {

  const [text,setText] = useState("");

  const onChangeHandler = (e) =>
  {

  }

  useEffect(() => {
    const timeOutId = setTimeout(() => sendQuery(text), 750);
    return () => clearTimeout(timeOutId);
  }, [text]);

  return (
    <CssTextField onChange={(e) => setText(e.target.value)} label="Search" sx={{ input: { color: 'white' } }}/>
  )
}
