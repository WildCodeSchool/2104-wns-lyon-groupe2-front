import React, { useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { FcPlus } from 'react-icons/fc'
import { useMutation, gql } from '@apollo/client'
import { TextField, Switch, FormControlLabel } from '@material-ui/core'
import { UserContext } from '../Context/UserContext'

// export interface AddWorkspaceProps {
// }
const ADD_WORKSPACE = gql`
  mutation createWorspace($input: InputWorkspace!) {
    createWorkspace(input: $input) {
      id
      title
      isSchoolWorkspace
      feed {
        id
        feedName
      }
      assets {
        id
        assetName
      }
    }
  }
`

const AddWorkspace: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [workspace, setWorkspace] = useState({
    title: '*',
    isSchoolWorkspace: false,
  })
  const { userInfos } = useContext(UserContext)
  const [addWorkspace] = useMutation(ADD_WORKSPACE)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (key, value) => {
    setWorkspace({ ...workspace, [key]: value })
  }
  const onSubmit = () => {
    try {
      if (workspace.title.length > 1) {
        addWorkspace({
          variables: {
            input: {
              title: workspace.title,
              isSchoolWorkspace: workspace.isSchoolWorkspace,
              schoolId: userInfos.schoolId,
              usersAllowed: 'all',
              feed: {
                feedName: 'Social',
              },
              assets: {
                assetName: 'Ressources',
              },
            },
          },
        })
      }
      window.location.reload()
      handleClose()
      alert('ok')
    } catch {
      // eslint-disable-next-line no-alert
      alert('Une erreur est survenue')
    }
  }

  return (
    <div>
      <FcPlus className="plus_icon" size={20} onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Ajouter un espace de travail
        </DialogTitle>
        <DialogContent>
          <form>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Titre de votre espace"
              name="title"
              autoFocus
              onChange={(e) => handleChange('title', e.target.value)}
              helperText={
                workspace.title.length > 0 ? (
                  ''
                ) : (
                  <p style={{ color: 'red' }}>Ce champ est requis</p>
                )
              }
            />
            {userInfos?.isSchoolAdmin ? (
              <FormControlLabel
                control={
                  <Switch
                    checked={workspace.isSchoolWorkspace}
                    onChange={() =>
                      handleChange(
                        'isSchoolWorkspace',
                        !workspace.isSchoolWorkspace,
                      )
                    }
                    name="isSchoolWorkspace"
                  />
                }
                label={
                  workspace.isSchoolWorkspace
                    ? 'Section Ecoles/Formations'
                    : 'Section Espace de travail'
                }
              />
            ) : null}
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button
            onClick={onSubmit}
            disabled={workspace.title.length < 2}
            color="primary"
            autoFocus
          >
            Valider
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default AddWorkspace
