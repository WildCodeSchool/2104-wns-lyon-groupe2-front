import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: any) => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    height: '100%',
  },
  logo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    width: '270px',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
  },
}))

export default useStyles
