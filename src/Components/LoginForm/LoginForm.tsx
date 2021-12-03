import React, { useState, useContext, ContextType } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Container,
  InputAdornment,
  IconButton,
} from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import * as EmailValidator from 'email-validator'
import { Link } from 'react-router-dom'
import { RouteComponentProps, withRouter } from 'react-router'
import { useMutation, gql } from '@apollo/client'
import { useToasts } from 'react-toast-notifications'
import { iInputLogin } from '../../Interfaces/Auth'
import { UserContext } from '../Context/UserContext'

import { LOGIN_MUTATION } from '../../graphql/mutations'

import { returnMessageForAnErrorCode } from '../../Tools/ErrorHandler'

import './LoginForm.scss'

// Pour gérer la redirection avec TS
type SomeComponentProps = RouteComponentProps

// L'interface ici doit (??) être identique à l'interface ...Graphql coté back ?

const LoginForm: React.FC<SomeComponentProps> = ({ history }) => {
  /* const classes = useStyles() */
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { addToast } = useToasts()
  const { addUser } = useContext(UserContext)

  // utilisation de useMutation pour envoyer les data au back
  //  check si retour des data, si oui on envoi
  // le token au local storage
  const [login, { data, error }] = useMutation(LOGIN_MUTATION, {
    errorPolicy: 'all',
  })

  // On définit notre Objet input que l'on va envoyer
  const input: iInputLogin = { input: { email, password, remember } }

  // La méthode onSubmit ajoute la variable à la useMutation login()
  const onSubmit = async (): Promise<void> => {
    const response = await login({ variables: input })
    // Ici une gestion d'erreur custom serait nécessaire
    if (!response.data.login) {
      let errorCode = ''
      if (
        response.errors &&
        response?.errors[0]?.message === 'Invalid Credentials'
      ) {
        errorCode = '108'
      }
      const errorMessage = returnMessageForAnErrorCode(errorCode)
      addToast(`${errorMessage}`, {
        appearance: 'error',
        autoDismiss: true,
      })
    } else {
      addUser(response.data.login.token)
    }
  }

  const validate = () => {
    return EmailValidator.validate(email) && password.length > 4
  }

  const handleKeyPress = (event: any) => {
    if (validate()) {
      if (event.key === 'Enter') {
        onSubmit()
      }
    }
  }

  return (
    <div className="login_container">
      <div className="login_form_and_logo">
        <img className="login_logo" src="/logo_daddy_studdies.png" alt="logo" />
        <form className="login_form">
          <div className="login_form_input">
            <p style={{ fontSize: '20px' }}>
              Veuillez vous connecter s'il vous plait
            </p>
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
              onKeyPress={(e) => handleKeyPress(e)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type={showPassword ? 'text' : 'password'}
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? (
                        <Visibility color="primary" />
                      ) : (
                        <VisibilityOff color="primary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              className="button_login"
              onClick={onSubmit}
              fullWidth
              variant="contained"
              disabled={!validate()}
            >
              Connexion
            </Button>
            <Grid container>
              <Grid item xs>
                <Link className="forgot_password_link" to="/forgotpassword">
                  <p>Mot de passe oublié ?</p>
                </Link>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
      <div className="company_presentation">
        <div className="presentation">
          <h2 className="title_presentation">
            Bienvenue sur le site Daddy Studdies
          </h2>
          <p className="content_presentation">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
          <Button
            onClick={() => history.push('/create-my-school')}
            fullWidth
            variant="contained"
            disabled={!validate()}
            style={{ marginTop: 20 }}
          >
            <p>Je souhaite inscrire mon école</p>
          </Button>
        </div>
      </div>
    </div>
  )
}

// withRouter necessaire pour redirection
export default withRouter(LoginForm)
