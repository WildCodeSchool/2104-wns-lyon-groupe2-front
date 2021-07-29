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
}))

export default useStyles
