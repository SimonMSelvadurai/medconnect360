//import { makeStyles, CssBaseline, createMuiTheme, ThemeProvider } from '@material-ui/core';
//import { createTheme,makeStyles} from '@mui/material/styles';
import { createTheme, makeStyles } from '@material-ui/core/styles';

const theme  = createTheme({
    palette: {
      primary: {
        main: "#333996",
        light: '#3c44b126'
      },
      secondary: {
        main: "#f83245",
        light: '#f8324526'
      },
      background: {
        default: "#f4f5fd"
      },
    },
    overrides:{
      MuiAppBar:{
        root:{
          transform:'translateZ(0)'
        }
      }
    },
    props:{
        MuiIconButton:{
        disableRipple:true
      }
    }
  })
  
  
  const useStyles = makeStyles({
    appMain: {
      paddingLeft: '320px',
      width: '100%'
    }
  })

  export {
	theme,
    useStyles
}