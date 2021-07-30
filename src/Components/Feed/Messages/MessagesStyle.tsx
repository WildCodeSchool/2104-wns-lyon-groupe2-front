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
    marginBottom: 20,
  },
  messagesContainer: {
    overflow: 'auto',
    height: '73vh',
    width: '100%',
    margin: 10,
  },
  bubble: {
    boxShadow: '2px 3px 5px 1px rgba(44, 49, 108, 0.15)',
    marginTop: 5,
    marginRight: 20,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 23,
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
    fontSize: 17,
    marginLeft: 20,
  },
  iconsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
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
    fontSize: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 2,
    cursor: 'pointer',
    '&:hover': {
      transform: 'scale(0.97)',
    },
  },
  likes: {
    fontSize: 12,
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  dislikes: {
    fontSize: 12,
    color: '#ab1620',
    fontWeight: 'bold',
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
  notMessages: {
    position: 'absolute',
    top: '40%',
    left: '55%',
    transform: 'translate(-50%, -50%)',
  },
}))

export default useStyles
