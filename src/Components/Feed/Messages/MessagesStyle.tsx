import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: { width: '100%', overflow: 'hidden' },
  form: {
    backgroundColor: '#f8f9fa',
    position: 'absolute',
    top: '92%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.up(768)]: {
      width: '85%',
      left: '58%',
    },
  },
  input: {
    width: '70%',
    position: 'relative',
  },
  submit: {},
  bubbleContainer: {
    marginBottom: '20px',
  },
  messagesContainer: {
    overflow: 'auto',
    height: '73vh',
    width: '100%',
    margin: 10,
  },
  bubble: {
    boxShadow: '2px 3px 5px 1px rgba(44, 49, 108, 0.15)',
    marginTop: '5px',
    marginRight: 20,
    marginBottom: '20px',
    backgroundColor: 'white',
    borderRadius: '23px',
    width: '80%',
    [theme.breakpoints.up(768)]: {
      width: '80%',
    },
  },
  paperContainer: { margin: 10 },
  purple: {
    backgroundColor: 'purple',
    float: 'left',
  },
  text: {
    fontSize: '17px',
    marginLeft: '20px',
  },
  icons: {
    float: 'right',
    display: 'flex',
    marginRight: '10px',
  },
  icon: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '10px',
    marginLeft: '5px',
    marginRight: '5px',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.up(768)]: {
      left: '56%',
    },
  },
}))

export default useStyles
