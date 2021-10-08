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
}))

export default useStyles
