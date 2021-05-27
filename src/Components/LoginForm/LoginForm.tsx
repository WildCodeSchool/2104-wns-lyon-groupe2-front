import React, { useContext, useState } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Container,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import * as EmailValidator from 'email-validator'
import { Link } from 'react-router-dom'
import { RouteComponentProps, withRouter } from 'react-router'

import axios from 'axios'
import useStyles from './LoginStyle'
import { UserContext } from '../Context/UserContext'

interface ILogin {
  email: string
  password: string
  remember: boolean
}
// Pour gérer la redirection avec TS
type SomeComponentProps = RouteComponentProps

const LoginForm: React.FC<SomeComponentProps> = ({ history }) => {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  // la variable d'environnement ne fonctionne pas chez moi...
  const { REACT_APP_API_URL } = process.env

  const onSubmit = (): void => {
    const formData: ILogin = { email, password, remember }
    // Token est redirection ok voir pour gestion du remember me en back
    // Et maj requete en front
    const crendentialsToSend = {
      query: `
      query {
        login(input:{email:"${formData.email}", password: "${formData.password}"}){token}}
      `,
    }

    axios
      .post(`http://localhost:4000/daddyStuddies`, crendentialsToSend)
      .then((res) => {
        // A voir pour modifier la res car pas dingue
        if (res.data.data.login.token) {
          localStorage.setItem('token', res.data.data.login.token)
          history.push('/')
        }
      })
  }
  const validate = () => {
    return EmailValidator.validate(email) && password.length > 4
  }

  return (
    <Container maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                color="primary"
                onChange={(e) => setRemember(!remember)}
              />
            }
            label="Se souvenir de moi"
          />
          <Button
            onClick={onSubmit}
            fullWidth
            variant="contained"
            color="primary"
            disabled={!validate()}
            className={classes.submit}
          >
            Connexion
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="/forgotpassword">Mot de passe oublié ?</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

// withRouter necessaire pour redirection
export default withRouter(LoginForm)
