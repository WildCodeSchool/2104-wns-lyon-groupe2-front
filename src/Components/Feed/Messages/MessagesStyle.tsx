import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: { width: '100%', overflow: 'hidden' },
  form: {
    // backgroundColor: '#f8f9fa',
    position: 'absolute',
    top: '92%',
    left: '50%',
    transform: 'translate(-45%, -30%)',
    display: 'flex',
    justifyContent: 'center',
    width: '90%',
    overflow: 'hidden',
    [theme.breakpoints.up(768)]: {
      width: '60%',
      left: '70%',
      transform: 'translate(-60%, -25%)',
    },
  },
  input: {
    width: '100%',
    margin: 5,

    border: '2px solid white',
    borderRadius: 10,
    [theme.breakpoints.up(768)]: {
      width: '70%',
    },
  },
  submit: {},
  bubbleContainer: {
    marginBottom: 5,
  },
  messagesContainer: {
    overflow: 'auto',
    height: '81vh',
    width: '100%',
    marginTop: 30,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bubble: {
    boxShadow: '2px 3px 5px 1px rgba(44, 49, 108, 0.15)',
    marginTop: 5,
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    border: '5px solid white',
    width: 300,
    [theme.breakpoints.up(600)]: {
      width: '400px',
    },
    [theme.breakpoints.up(900)]: {
      width: '600px',
    },
    [theme.breakpoints.up(1100)]: {
      width: '700px',
    },
    [theme.breakpoints.up(1200)]: {
      width: '800px',
    },
  },
  paperContainer: {
    width: '100%',
    padding: 0,
    margin: 0,
  },
  userNameContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    float: 'left',
    margin: 5,
    width: '100%',
    borderRadius: 20,
    height: 60,
    cursor: 'pointer',
  },
  nickName: {
    float: 'left',
    color: 'white',
  },
  userName: {
    fontSize: 17,
    margin: 10,
    marginLeft: 50,
    color: '#3b3b3b',
    alignItems: 'center',
  },
  date: {
    fontSize: 17,
    margin: 10,
    marginRight: 25,
    color: '#3b3b3b',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    width: '80%',
    margin: '40px auto',
    wordWrap: 'break-word',
    marginTop: 20,
    marginBottom: 5,
    padding: 5,
    color: '#3b3b3b',
  },
  iconsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  icons: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  icon: {
    width: '100%',
    justifyContent: 'center',
    fontSize: 10,
    marginBottom: 2,
    cursor: 'pointer',
    flexDirection: 'row',
    '&:hover': {
      transform: 'scale(0.97)',
    },
  },
  likes: {
    fontSize: 16,
    color: '#3b3b3b',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  dislikes: {
    fontSize: 16,
    color: '#3b3b3b',
    fontWeight: 'bold',
    marginLeft: 5,
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
