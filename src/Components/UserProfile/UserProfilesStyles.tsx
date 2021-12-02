import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  firstRow: {
    display: 'flex',
    justifyContent: 'spaceAround',
  },
  field: {
    margin: 20,
    fontSize: 20,
    fontWeight: 500,
  },
  uploadContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
  },
  uploadAvatar: {
    margin: 10,
  },
  uploadBackground: {
    margin: 10,
  },
  coverContainer: {
    height: 50,
    position: 'relative',
    top: 0,
  },
}))

export default useStyles
