import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {},
  bubbleContainer: {
    marginBottom: 20,
  },
  commentsContainer: {
    overflow: 'auto',
    height: '73vh',
    margin: 10,
  },
  bubble: {
    boxShadow: '2px 3px 5px 1px rgba(44, 49, 108, 0.15)',
    marginTop: 5,
    marginRight: 20,
    marginBottom: 30,
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
    margin: 10,
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
    marginBottom: 2,
    cursor: 'pointer',
    flexDirection: 'row',
    '&:hover': {
      transform: 'scale(0.97)',
    },
    marginLeft: 5,
    marginRight: 5,
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
