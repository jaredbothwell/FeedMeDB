import { TextField } from '@mui/material';
import { withStyles } from '@material-ui/core/styles';

export default withStyles({
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