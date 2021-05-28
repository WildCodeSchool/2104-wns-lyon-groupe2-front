import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: { width: '100%' },
  form: {
    position: 'absolute',
    top: '92%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    width: '80%',
    [theme.breakpoints.up(768)]: {
      width: '70%',
      left: '58%',
    },
  },
  input: {
    width: '100%',
    marginLeft: '10px',
    marginRight: '10px',
  },
  submit: {},
  bubbleContainer: {
    float: 'right',
    marginBottom: '20px',
  },
  messagesContainer: {
    overflow: 'auto',
    height: '580px',
    [theme.breakpoints.up(375)]: {
      height: '520px',
    },
    [theme.breakpoints.up(375)]: {
      height: '560px',
    },
  },
  bubble: {
    width: '80%',
    boxShadow: '5px 5px 5px grey',
    marginTop: '5px',
    marginRight: '15px',
    marginBottom: '20px',
    backgroundColor: 'whitesmoke',
    borderRadius: '30px',
    [theme.breakpoints.up(768)]: {
      width: '70%',
    },
  },
  paperContainer: { margin: '20px' },
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
}))

export default useStyles
