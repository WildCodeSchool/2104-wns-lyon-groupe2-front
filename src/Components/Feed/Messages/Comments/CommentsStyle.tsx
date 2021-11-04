import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {},
  bubbleContainer: {
    marginBottom: 10,
  },
  commentsContainer: {
    overflow: 'auto',
    height: '73vh',
    width: '100%',
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  messageContainer: {
    width: '100%',
    margin: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  bubble: {
    boxShadow: '2px 3px 5px 1px rgba(44, 49, 108, 0.15)',
    marginTop: 5,
    marginBottom: 30,
    backgroundColor: '#f2f1eb',
    borderRadius: 23,
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
  bubbleMessage: {
    boxShadow: '2px 3px 5px 1px rgba(44, 49, 108, 0.15)',
    marginTop: 5,
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 23,
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
  paperContainer: { margin: 10 },
  userNameContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    float: 'left',
    margin: 5,
    width: '100%',
    borderRadius: 20,
    height: 60,
  },
  nickName: {
    backgroundColor: '#4aa0bd',
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
    marginLeft: 20,
  },
  iconsContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    width: '70%',
    position: 'relative',
  },
  icons: {
    display: 'flex',
    width: '100%',
  },
  icon: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    fontSize: 10,
    cursor: 'pointer',
    flexDirection: 'row',
    '&:hover': {
      backgroundColor: '#3b3b5',
    },
  },
  likes: {
    fontSize: 12,
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  commentIcon: {
    color: '#3b3b3b',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
}))

export default useStyles
