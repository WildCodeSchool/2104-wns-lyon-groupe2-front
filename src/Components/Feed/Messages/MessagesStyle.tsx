import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
  },
  message: {
    width: '100%',
  },
  form: {
    minHeight: '70px',
    maxHeight: '70px',
    backgroundColor: '#f8f9fa',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    overflow: 'hidden',
    [theme.breakpoints.up(768)]: {
      width: '100%',
    },
  },
  input: {
    width: '60%',
    margin: 15,
    border: '2px solid white',
    borderRadius: 10,
  },
  submit: {},
  bubbleContainer: {
    marginBottom: 5,
  },
  messagesContainer: {
    overflowY: 'auto',
    overflowX: 'hidden',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: 'calc(100% - 40px)',
  },
  bubble: {
    padding: '10px',
    borderRadius: 0,
    borderBottom: 'solid 1px lightgray',
  },
  paperContainer: {
    width: '100%',
    padding: 0,
    margin: 0,
  },
  nickName: {
    marginRight: '10px',
    color: 'white',
  },
  userNameAndDate: {
    display: 'flex',
    flexDirection: 'column',
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#3b3b3b',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#3b3b3b',
    alignItems: 'center',
  },
  text: {
    fontSize: 17,
    width: '80%',
    wordWrap: 'break-word',
    color: '#3b3b3b',
  },
  iconsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 0,
    right: 0,
    position: 'absolute',
  },
  icons: {
    fontSize: '12px',
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: '2px',
    fontSize: '16px',
  },
  likes: {
    fontSize: 16,
    color: '#696969',
    fontWeight: 'bold',
  },
  dislikes: {
    fontSize: 16,
    color: '#696969',
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
