import React, { useState } from 'react'
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
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { gql, useQuery } from '@apollo/client'
import useStyles from './LoginStyle'

interface ILogin {
  email: string
  password: string
  remember: boolean
}

const LoginForm: React.FC = () => {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  const { REACT_APP_API_URL } = process.env

  const onSubmit = (): void => {
    const formData: ILogin = { email, password, remember }
    // Ci-dessous envoi de la query en front, à definir les besoins
    // du contenu du JWT.
    // Pour le moment le booleen "remember" n'est pas envoyé au back.
    const crendentialsToSend = {
      query: `
      query {
        login(input:{email:"${formData.email}", password: "${formData.password}"}){token}}
      `,
    }
    axios
      .post(`${REACT_APP_API_URL}daddyStuddies`, crendentialsToSend)
      .then((res) => console.log(res.data))
    // Token dans la réponse, à envoyer dans un cookie en front ?
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

export default LoginForm
