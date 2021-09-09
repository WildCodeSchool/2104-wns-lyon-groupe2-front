import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Popover, TextField } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { CREATE_FOLDER } from '../../graphql/mutations'
import { GET_FOLDERS_BY_CURRENT_USER_ID } from '../../graphql/queries'

const AddFolder: React.FC = () => {
  let input: HTMLInputElement
  const [folderName, setFolderName] = useState<null | string>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [addFolder] = useMutation(CREATE_FOLDER, {
    refetchQueries: [
      {
        query: GET_FOLDERS_BY_CURRENT_USER_ID,
      },
    ],
  })

  const handleClick = () => {
    setIsModalOpen(!isModalOpen)
  }

  const submitNewFolder = (e: any = null) => {
    if ((e && e.key === 'Enter') || !e) {
      addFolder({
        variables: {
          input: {
            name: folderName,
            parentDirectory: '',
            isRootDirectory: false,
          },
        },
      })
      setIsModalOpen(!isModalOpen)
      setFolderName(null)
    }
  }

  return (
    <div className="add_asset_container">
      <Fab aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab>
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={handleClick}>
          <div className="add_asset_modal">
            <p>Nouveau dossier</p>
            <TextField
              variant="outlined"
              className="asset_title"
              onChange={(e) => setFolderName(e.target.value)}
              value={folderName}
              onKeyDown={(e) => submitNewFolder(e)}
            />
            <div className="add_asset_modal_action_bar">
              <Button onClick={() => handleClick()} variant="contained">
                Annuler
              </Button>
              <Button
                onClick={() => submitNewFolder()}
                color="primary"
                variant="contained"
              >
                Créer
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default AddFolder
