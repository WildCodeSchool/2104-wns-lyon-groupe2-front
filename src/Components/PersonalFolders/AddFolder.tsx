import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Popover, TextField } from '@material-ui/core'
import Modal from '@material-ui/core/Modal'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { CREATE_FOLDER } from '../../graphql/mutations'

type TAddFolderProps = {
  refetch: any
  parentId: string
}

const AddFolder: React.FC<TAddFolderProps> = ({ refetch, parentId }) => {
  console.log(parentId)
  const [folderName, setFolderName] = useState<null | string>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sameNameError, setSameNameError] = useState(false)
  const [addFolder, { error }] = useMutation(CREATE_FOLDER, {
    onCompleted: () => {
      setIsModalOpen(!isModalOpen)
      setFolderName(null)
      setSameNameError(false)
      refetch()
    },
    onError: () => {
      setSameNameError(true)
    },
  })

  const handleClick = () => {
    setIsModalOpen(!isModalOpen)
    setSameNameError(false)
  }

  const submitNewFolder = async (e: any = null) => {
    if ((e && e.key === 'Enter') || !e) {
      await addFolder({
        variables: {
          input: {
            name: folderName,
            parentDirectory: parentId,
            isRootDirectory: false,
          },
        },
      })
    }
  }

  return (
    <div className="add_folder_container">
      <Fab aria-label="add" onClick={handleClick}>
        <AddIcon />
      </Fab>
      {isModalOpen && (
        <Modal open={isModalOpen} onClose={handleClick}>
          <div className="add_folder_modal">
            <p>Nouveau dossier</p>
            <TextField
              error={sameNameError}
              variant="outlined"
              className="folder_title"
              onChange={(e) => setFolderName(e.target.value)}
              value={folderName}
              onKeyDown={(e) => submitNewFolder(e)}
            />
            {sameNameError && (
              <p className="add_folder_modal_same_name_error">
                Un dossier portant ce nom existe déjà
              </p>
            )}
            <div className="add_folder_modal_action_bar">
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
