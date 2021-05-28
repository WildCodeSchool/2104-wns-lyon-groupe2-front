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
import { Link } from 'react-router-dom'
import { RouteComponentProps, withRouter } from 'react-router'
import { useMutation, gql } from '@apollo/client'
import { useToasts } from 'react-toast-notifications'

import useStyles from './LoginStyle'

// Pour gérer la redirection avec TS
type SomeComponentProps = RouteComponentProps

// L'interface ici doit (??) être identique à l'interface ...Graphql coté back ?
interface InputLogin {
  input: {
    email: string
    password: string
    remember: boolean
  }
}

const LoginForm: React.FC<SomeComponentProps> = ({ history }) => {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const { addToast } = useToasts()

  // On écrit la mutation comme définit dans le back
  // ici on envoie la variable input définit plus bas
  // et onrécupère le token
  const LOGIN_MUTATION = gql`
    mutation login($input: InputLogin!) {
      login(input: $input) {
        token
      }
    }
  `
  // utilisation de useMutation (ReactQuery) pour envoyer les data au back
  // et la methode onCompleted check si retour des data, si oui on envoi
  // le token au local storage
  const [login, { data, error }] = useMutation(LOGIN_MUTATION, {
    errorPolicy: 'all',
  })

  // On définit notre Objet input que l'on va envoyer
  const input: InputLogin = { input: { email, password, remember } }

  // La méthode onSubmit ajoute la variable à la useMutation login()
  const onSubmit = async (): Promise<void> => {
    const response = await login({ variables: input })
    // Ici une gestion d'erreur custom serait nécessaire
    if (!response.data.login) {
      const errorMessage = error?.graphQLErrors.map(({ message }) => message)[0]
      addToast(`${errorMessage}`, {
        appearance: 'error',
        autoDismiss: true,
      })
    } else {
      localStorage.setItem('token', response.data.login.token as string)
      history.push('/')
    }
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
