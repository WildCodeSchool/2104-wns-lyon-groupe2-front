/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { useForm, Controller } from 'react-hook-form'
import './AddNewUser.scss'
import { gql, useMutation } from '@apollo/client'
import XLSX from 'xlsx'
import {
  Paper,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  TextField,
  Button,
} from '@material-ui/core'
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

  const [spreadSheetJSON, setSpreadSheetJSON] = useState([])

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

  const parseExcel = function (event: React.FormEvent<HTMLInputElement>) {
    const input = event.target as HTMLInputElement
    if (input.files) {
      const spreadSheet = input?.files[0]
      if (spreadSheet) {
        const reader = new FileReader()
        reader.onload = function (e) {
          const datas = e?.target?.result
          if (datas) {
            const workbook = XLSX.read(datas, {
              type: 'binary',
            })
            workbook.SheetNames.forEach(function (sheetName) {
              const XLRowObject: any = XLSX.utils.sheet_to_json(
                workbook.Sheets[sheetName],
              )
              console.log(XLRowObject)
              setSpreadSheetJSON(XLRowObject)
            })
          }
        }
        reader.onerror = function (ex) {
          console.log(ex)
        }

        reader.readAsBinaryString(spreadSheet)
      }
    }
  }

  const createMultipleUsers = () => {
    const errorMessages: string[] = []
    spreadSheetJSON.forEach(async (user: any) => {
      const userData = {
        firstname: user.Prénom,
        lastname: user.Nom,
        email: user.Email,
        userType: user.Catégorie,
        schoolId: '1',
        isSchoolAdmin: false,
      }
      try {
        const response = await addUser({ variables: { input: userData } })
        if (response.errors && response.errors.length > 0) {
          let errorCode = ''
          // manage the error thrown by mongodb (if the user already exist)
          if (response.errors[0].message?.includes('E11000')) {
            errorCode = '100'
          } else if (response.errors[0].message) {
            errorCode = response.errors[0].message
          }
          const errorMessage = returnMessageForAnErrorCode(errorCode)
          errorMessages.push(errorMessage)
        }
        if (!response.errors) {
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
    })
    setTimeout(() => {
      console.log(errorMessages)
      if (errorMessages.length > 0) {
        addToast(
          `Une erreur s'est produite pour ${errorMessages.length} utilisateurs, veuillez vérifier le fichier et réessayer.`,
          {
            appearance: 'error',
            autoDismiss: true,
          },
        )
      }
    }, 500)
  }

  return (
    <div className="new-user-form-wrapper">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
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
        <Paper className="import-xlsx-file-wrapper">
          <h2>Importer un fichier pour créer plusieurs utilisateurs</h2>
          <p>
            Afin de faciliter la création de multiples utilisateurs, vous pouvez
            importer un fichier de type xlsx (modèle disponible ici)
          </p>

          <Button
            component="label"
            variant="contained"
            className="import-xlsx-file-button"
          >
            <input
              hidden
              type="file"
              id="fileUploader"
              name="fileUploader"
              accept=".xls, .xlsx"
              onChange={(e) => parseExcel(e)}
            />{' '}
            Importer un fichier XLSX
          </Button>
          {spreadSheetJSON && spreadSheetJSON.length > 0 && (
            <Button onClick={() => createMultipleUsers()} variant="contained">
              Créer les utilisateurs
            </Button>
          )}
        </Paper>
      </form>
    </div>
  )
}

export default AddNewUser
