/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { useForm, Controller } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './AddNewUser.scss'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import { gql, useMutation } from '@apollo/client'
import { UserContext } from '../../Components/Context/UserContext'
import { returnMessageForAnErrorCode } from '../../Tools/ErrorHandler'

const AddNewUser: React.FC = () => {
  const {
    clearErrors,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const history = useHistory()
  const { userInfos } = useContext(UserContext)
  const { addToast } = useToasts()
  const ADD_USER = gql`
    mutation registerUser($input: InputUser!) {
      registerUser(input: $input) {
        email
        lastname
        firstname
      }
    }
  `

  const [addUser, { data, error }] = useMutation(ADD_USER, {
    errorPolicy: 'all',
  })

  useEffect(() => {
    if (userInfos && !userInfos.isSchoolAdmin) {
      addToast("Vous n'êtes pas autorisé à accéder à cette section", {
        appearance: 'error',
        autoDismiss: true,
      })
      history.push('/')
    }
  }, [userInfos])

  const onSubmit = async (datas: any) => {
    const input = { input: { ...datas, schoolId: '1', isSchoolAdmin: false } }
    try {
      const response = await addUser({ variables: input })
      if (response.errors && response.errors.length > 0) {
        let errorCode = ''
        // manage the error thrown by mongodb (if the user already exist)
        if (response.errors[0].message?.includes('E11000')) {
          errorCode = '100'
        } else if (response.errors[0].message) {
          errorCode = response.errors[0].message
        }
        const errorMessage = returnMessageForAnErrorCode(errorCode)
        addToast(errorMessage, {
          appearance: 'error',
          autoDismiss: true,
        })
      } else if (!response.errors) {
        addToast("L'utilisateur a été créé avec succès", {
          appearance: 'success',
          autoDismiss: true,
        })
      }
    } catch (err) {
      addToast("Une erreur s'est produite, veuillez rééssayer", {
        appearance: 'error',
        autoDismiss: true,
      })
    }
  }

  return (
    <div className="new-user-form-wrapper">
      <form className="n" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="">Inscrire un nouvel utilisateur</h1>
        <TextField
          helperText={errors.firstname ? "Merci d'indiquer un prénom" : false}
          error={!!errors.firstname}
          className="new-user-input"
          label="Prénom"
          variant="outlined"
          {...register('firstname', { required: true })}
        />
        <TextField
          helperText={errors.lastname ? "Merci d'indiquer un nom" : false}
          error={!!errors.lastname}
          className="new-user-input"
          label="Nom"
          variant="outlined"
          {...register('lastname', { required: true })}
        />
        <TextField
          helperText={errors.email ? "Merci d'indiquer un email" : false}
          error={!!errors.email}
          className="new-user-input"
          label="Email"
          variant="outlined"
          {...register('email', { required: true })}
        />
        {/* include validation with required or other standard HTML validation rules */}
        {/* <input {...register("exampleRequired", { required: true })} /> */}
        {/* errors will return when field validation fails  */}
        {/* {errors.firstname && <span>This field is required</span>}
		{errors.message && <span>This field is required</span>} */}
        <FormControl className="new-user-radio-wrapper" component="fieldset">
          <FormLabel component="legend">L&apos;utilisateur est-il</FormLabel>
          <RadioGroup aria-label="userType" {...register('userType')}>
            <div className="new-user-radio">
              <FormControlLabel
                value="STUDENT"
                control={<Radio />}
                label="un elève ?"
              />
              <FormControlLabel
                value="TEACHER"
                control={<Radio />}
                label="un enseignant ?"
              />
            </div>
          </RadioGroup>
        </FormControl>
        <Button
          className="new-user-submit-button"
          type="submit"
          variant="contained"
        >
          C&apos;est parti !
        </Button>
      </form>
      <input
        type="file"
        id="fileUploader"
        name="fileUploader"
        accept=".xls, .xlsx"
      />
    </div>
  )
}

export default AddNewUser
