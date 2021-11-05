import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import React from 'react'
import { IDeleteProps } from '../../../Interfaces/Assets'

const DeleteModal: React.FC<IDeleteProps> = ({
  openModal,
  setOpenModal,
  confirmDelete,
}) => {
  const handleSwitch = () => {
    setOpenModal(!openModal)
  }
  return (
    <Dialog
      open={openModal}
      onClose={handleSwitch}
      aria-labelledby="alert-delete-title"
      aria-describedby="alert-delete-description"
    >
      {' '}
      <DialogTitle id="alert-delete-title">
        "Do you really to delete those files?"
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-delete-description">
          After this, files will be erase from our server and dissappear forever
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSwitch}>CANCEL</Button>
        <Button onClick={confirmDelete} autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteModal
