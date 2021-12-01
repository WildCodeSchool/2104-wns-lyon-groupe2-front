import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Modal from '@material-ui/core/Modal'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { Box } from '@material-ui/core'
import { CREATE_FOLDER } from '../../graphql/mutations'
import { TabsContainer } from './TabsContainer'
import { IModalProps } from '../../Interfaces/Assets'

const ModalContainer: React.FC<IModalProps> = function ({
  refetch,
  parentId,
  updateComponent,
  setUpdateComponent,
}) {
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
          <Box className="add_folder_modal">
            <TabsContainer
              folderId={parentId}
              setUpdateComponent={setUpdateComponent}
              updateComponent={updateComponent}
              refetch={refetch}
              parentId={parentId}
              handleClick={handleClick}
              submitNewFolder={submitNewFolder}
              sameNameError={sameNameError}
              folderName={folderName}
              setFolderName={setFolderName}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
          </Box>
        </Modal>
      )}
    </div>
  )
}

export default ModalContainer
