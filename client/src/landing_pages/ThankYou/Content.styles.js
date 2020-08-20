import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    flex: '1 0 auto',
    padding: theme.spacing(2),
  },
  title: {
    fontSize: '1.5em',
    padding: '20px 0px',
  },
  cta: {
    fontSize: '1.25em',
    color: 'white',
    backgroundColor: theme.palette.colors.maroon,
    padding: '4px 24px',
    margin: '13vh 0',
    whiteSpace: "pre-wrap",
    '&:hover': {
      backgroundColor: '#b14f7c'
    }
  },
  gif: {
    width: "auto",
    height: 250,
    margin: "10px 0" 
  }
}));

export default useStyles;
