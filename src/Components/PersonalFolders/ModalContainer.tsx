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
  setCreateFolderMode,
  createFolderMode,
  isOpen,
  setIsOpen,
  refetch,
  parentId,
  updateComponent,
  setUpdateComponent,
}) {
  const [folderName, setFolderName] = useState<null | string>(null)
  const [sameNameError, setSameNameError] = useState(false)
  const [addFolder, { error }] = useMutation(CREATE_FOLDER, {
    onCompleted: () => {
      setIsOpen(!isOpen)
      setFolderName(null)
      setSameNameError(false)
      refetch()
    },
    onError: () => {
      setSameNameError(true)
    },
  })

  const handleClick = () => {
    setIsOpen(!isOpen)
    setSameNameError(false)
    setCreateFolderMode(false)
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
      {isOpen && (
        <Modal open={isOpen} onClose={handleClick}>
          <Box className="add_folder_modal">
            <TabsContainer
              createFolderMode={createFolderMode}
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
              isModalOpen={isOpen}
              setIsModalOpen={setIsOpen}
            />
          </Box>
        </Modal>
      )}
    </div>
  )
}

export default ModalContainer
