import React, { useState, useEffect } from 'react'
import { TextField, Button, Container } from '@material-ui/core'
import * as EmailValidator from 'email-validator'
import { useLazyQuery, gql } from '@apollo/client'

import useStyles from '../../Components/LoginForm/LoginStyle'

const ForgotPassword: React.FC = () => {
  const classes = useStyles()
  const [email, setEmail] = useState<string>('')

  const validate = (): boolean => {
    return EmailValidator.validate(email)
  }

  const GET_PASSWORD_BY_MAIL = gql`
    query getMyPasswordBack($email: String!) {
      getMyPasswordBack(email: $email) {
        message
        id
      }
    }
  `
  const [getMyPasswordBack, { loading, error, data }] =
    useLazyQuery(GET_PASSWORD_BY_MAIL)
  const onSubmit = () => {
    getMyPasswordBack({ variables: { email } })
  }
  return (
    <Container
      data-testid="forgot_container"
      className="forgot_password_container"
    >
      <div className={classes.paper}>
        <div className={classes.title}>
          <h4>Récupération de mot de passe</h4>
        </div>
        <form data-testid="forgot_form">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Votre email"
            name="email"
            autoComplete="email"
            autoFocus
            inputProps={{ 'data-testid': 'email' }}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            data-testid="send_mail_button"
            onClick={onSubmit}
            fullWidth
            variant="contained"
            color="primary"
            disabled={!validate()}
            className={classes.submit}
          >
            Connexion
          </Button>
        </form>
      </div>
    </Container>
  )
}

export default ForgotPassword
