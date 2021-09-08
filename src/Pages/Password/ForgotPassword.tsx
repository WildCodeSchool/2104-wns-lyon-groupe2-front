import React, { useState, useEffect } from 'react'
import { TextField, Button, Container } from '@material-ui/core'
import * as EmailValidator from 'email-validator'
import { useMutation, gql } from '@apollo/client'

import useStyles from '../../Components/LoginForm/LoginStyle'

// This component was built following TDD method with
// React testing Library, and mockProvider from Apollo Graphql
export const GET_PASSWORD_BY_MAIL = gql`
  mutation getMyPasswordBack($email: String!) {
    getMyPasswordBack(email: $email) {
      message
      id
    }
  }
`

export const ForgotPassword: React.FC = (props: any) => {
  const { history } = props
  const classes = useStyles()
  const [email, setEmail] = useState<string>('')

  const [getMyPasswordBack, { loading, data, error }] = useMutation(
    GET_PASSWORD_BY_MAIL,
    {
      errorPolicy: 'all',
    },
  )
  let response
  const onSubmit = async (): Promise<void> => {
    if (props.onClick) {
      props.onClick()
    }
    response = await getMyPasswordBack({ variables: { email } })
    if (response.data.getMyPasswordBack && response.data.getMyPasswordBack.id) {
      history.push('/mailsent')
    }
  }

  const validate = (): boolean => {
    return EmailValidator.validate(email)
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
        {loading && <p>Loading...</p>}
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
          {error && (
            <p className={classes.formError}>This mail does not exist!</p>
          )}

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
