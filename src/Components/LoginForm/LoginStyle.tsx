import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  logo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    width: '270px',
    [theme.breakpoints.up(768)]: {
      width: '300px',
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  forgotPassword: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
  },
  title: {
    fontSize: '1.8rem',
  },
  formError: {
    color: 'red',
  },
  forgot: {
    textAlign: 'center',
  },
}))

export default useStyles
