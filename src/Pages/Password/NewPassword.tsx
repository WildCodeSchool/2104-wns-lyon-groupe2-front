import { useQuery, gql, useMutation } from '@apollo/client'
import { Container, TextField, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useToasts } from 'react-toast-notifications'

import useStyles from './NewPasswordStyle'

interface InputPasswordRecovery {
  userId: string
  token: string
}
interface InputToChangePassword {
  userId: string
  password: string
  // eslint-disable-next-line camelcase
  first_connection: boolean
}

const NewPassword: React.FC = function (props: any) {
  const { addToast } = useToasts()
  const { history } = props
  const classes = useStyles()
  const [ShowErrorMessage, setShowErrorMessage] = useState(false)
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({
    errors: {
      passwordError: false,
      confirmError: false,
      passwordMatch: '',
      passwordRegex: '',
    },
  })

  const {
    match: { params },
  } = props
  const input: InputPasswordRecovery = {
    userId: params.id,
    token: params.token,
  }
  const inputToChangePassword: InputToChangePassword = {
    userId: params.id,
    password,
    first_connection: false,
  }
  // this is the query to verify that token and userid combinaison works
  const CHECK_INFOS_FOR_PWD_RECOVERY = gql`
    query checkTokenWithUserId($input: InputPasswordRecovery!) {
      checkTokenWithUserId(input: $input)
    }
  `
  const { loading, error, data } = useQuery(CHECK_INFOS_FOR_PWD_RECOVERY, {
    variables: { input },
  })

  const UPDATE_PASSWORD = gql`
    mutation updatePassword($inputToChangePassword: InputToChangePassword!) {
      updatePassword(inputToChangePassword: $inputToChangePassword) {
        message
      }
    }
  `
  const [updatePassword] = useMutation(UPDATE_PASSWORD, {
    errorPolicy: 'all',
  })

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    const test = new RegExp(regex).test(event.target.value)
    if (!test) {
      setErrors((prevState) => ({
        errors: {
          ...prevState.errors,
          passwordRegex:
            'Your password must contain at least 8 digit, one letter and one number',
          passwordError: true,
        },
      }))
    } else {
      setErrors((prevState) => ({
        errors: {
          ...prevState.errors,
          passwordError: false,
          passwordRegex: '',
        },
      }))
    }
    setPassword(event.target.value)
  }
  const handlePasswordConfirmChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.value !== password && password.length > 8) {
      setErrors((prevState) => ({
        errors: {
          ...prevState.errors,
          passwordMatch: "Password doesn't matchs!",
          confirmError: true,
        },
      }))
    } else {
      setErrors((prevState) => ({
        errors: {
          ...prevState.errors,
          passwordMatch: '',
          confirmError: false,
        },
      }))
    }
  }
  const validate = () => {
    return !errors?.errors?.passwordError && !errors?.errors?.confirmError
  }
  let response
  const onSubmit = async (): Promise<void> => {
    if (props.onClick) {
      props.onClick()
    }
    response = await updatePassword({ variables: { inputToChangePassword } })
    if (
      response.data.updatePassword.message &&
      response.data.updatePassword.message === 'updated'
    ) {
      addToast('Mot de passe modifié avec succès, merci de vous identifier.', {
        appearance: 'success',
        autoDismiss: true,
      })
      history.push('/')
    } else if (response.errors) {
      setShowErrorMessage(true)
    }
  }
  return (
    <Container>
      {loading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {data && (
        <Container>
          <div className={classes.paper}>
            <form>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                onChange={handlePasswordChange}
                error={errors?.errors?.passwordError}
                helperText={errors?.errors?.passwordRegex}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="Confirmation de mot de passe"
                type="password"
                id="password"
                onChange={handlePasswordConfirmChange}
                error={errors?.errors?.confirmError}
                helperText={errors?.errors?.passwordMatch}
              />
              {ShowErrorMessage && (
                <p className={classes.error}>
                  Un problème est survenu, merci de réessayer.
                </p>
              )}
              <Button
                onClick={onSubmit}
                fullWidth
                variant="contained"
                color="primary"
                disabled={!validate()}
              >
                Changer mon mot de passe.
              </Button>
            </form>
          </div>
        </Container>
      )}
    </Container>
  )
}

export default NewPassword
