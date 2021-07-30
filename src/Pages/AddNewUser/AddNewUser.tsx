/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { useForm } from 'react-hook-form'
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
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { withStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import { returnMessageForAnErrorCode } from '../../Tools/ErrorHandler'
import { UserContext } from '../../Components/Context/UserContext'
import { iXLSXUser, iNewUser } from '../../Interfaces/UsersInterfaces'

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

  const createUser = async (datas: iNewUser) => {
    console.log(datas)
    const { schoolId } = userInfos
    const input = {
      input: { ...datas, schoolId, isSchoolAdmin: false },
    }
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
              const importError: iXLSXUser[] = []
              XLRowObject.forEach((row: iXLSXUser) => {
                const keys = Object.keys(row)
                if (
                  keys[0] !== 'Nom' ||
                  keys[1] !== 'Prénom' ||
                  keys[2] !== 'Email' ||
                  keys[3] !== 'Catégorie'
                ) {
                  importError.push(row)
                }
              })
              if (importError.length > 0) {
                addToast(
                  "Le fichier importé n'est pas valide, merci de le vérifier.",
                  {
                    appearance: 'error',
                    autoDismiss: true,
                  },
                )
              } else {
                setSpreadSheetJSON(XLRowObject)
              }
            })
          }
        }
        reader.onerror = function (ex) {
          console.log(ex)
          addToast("Une erreur s'est produite, veuillez rééssayer", {
            appearance: 'error',
            autoDismiss: true,
          })
        }

        reader.readAsBinaryString(spreadSheet)
      }
    }
  }

  const createMultipleUsers = () => {
    const { schoolId } = userInfos
    const errorMessages: string[] = []
    spreadSheetJSON.forEach(async (user: iXLSXUser) => {
      const userData: iNewUser = {
        firstname: user.Prénom,
        lastname: user.Nom,
        email: user.Email,
        schoolId,
        isSchoolAdmin: false,
      }
      if (user.Catégorie && user.Catégorie === 'Etudiant') {
        userData.userType = 'STUDENT'
      } else if (user.Catégorie && user.Catégorie === 'Enseignant') {
        userData.userType = 'TEACHER'
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
      } catch (err) {
        addToast("Une erreur s'est produite, veuillez rééssayer", {
          appearance: 'error',
          autoDismiss: true,
        })
      }
    })
    setTimeout(() => {
      if (errorMessages.length > 0) {
        addToast(
          `Tous les utilisateurs n'ont pas été créés. Une erreur s'est produite pour ${
            errorMessages.length
          } utilisateur${
            errorMessages.length === 1 ? '' : 's'
          }, veuillez vérifier le fichier et réessayer.`,
          {
            appearance: 'info',
            autoDismiss: true,
          },
        )
      } else {
        addToast(`Les utilisateurs ont été créés avec succès`, {
          appearance: 'success',
          autoDismiss: true,
        })
      }
    }, 500)
    setSpreadSheetJSON([])
  }

  const ColorButton = withStyles((theme) => ({
    root: {
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Button)

  return (
    <div className="new-user-form-wrapper">
      <form className="" onSubmit={handleSubmit(createUser)}>
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
        <ColorButton
          className="new-user-submit-button"
          type="submit"
          variant="contained"
        >
          C&apos;est parti !
        </ColorButton>
        <Paper className="import-xlsx-file-wrapper" elevation={5}>
          <h2>Importer un fichier pour créer plusieurs utilisateurs</h2>
          <p>
            Afin de faciliter la création de multiples utilisateurs, vous pouvez
            importer un fichier de type xlsx.
            <br /> Attention le fichier devra impérativement posséder les
            entêtes de colonnes suivantes : Nom, Prénom, Email, Catégorie
            (Etudiant ou Enseignant). Modèle disponible{' '}
            <Link to="/files/Modèle.xlsx" target="_blank" download>
              ici
            </Link>
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
              accept=".xlsx"
              onChange={(e) => {
                parseExcel(e)
              }}
              onClick={(event) => {
                // eslint-disable-next-line no-param-reassign
                event.currentTarget.value = ''
              }}
            />{' '}
            Importer un fichier XLSX
          </Button>
          {spreadSheetJSON && spreadSheetJSON.length > 0 && (
            <ColorButton
              className="import-xlsx-create-multiple-users-button"
              onClick={() => createMultipleUsers()}
              variant="contained"
            >
              <CheckCircleOutlineIcon className="import-xlsx-create-multiple-users-icon-button" />
              Créer les utilisateurs
            </ColorButton>
          )}
        </Paper>
      </form>
    </div>
  )
}

export default AddNewUser
