import React, { useEffect, useState } from 'react'
import { Box, Button, Typography, Modal } from '@material-ui/core'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import {
  BsChevronRight,
  BsChevronDown,
  BsArrowRightCircle,
  BsArrowLeftCircle,
} from 'react-icons/bs'
import { useQuery, useMutation } from '@apollo/client'
import { AiFillFolder } from 'react-icons/ai'

import { GET_FOLDERS_BY_CURRENT_USER_ID } from '../../graphql/queries'
import './MoveFolderModal.scss'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

type TAddFolderProps = {
  open: boolean
  setOpen: any
}

const MoveFolderModal: React.FC<TAddFolderProps> = ({ open, setOpen }) => {
  const [folders, setFolders] = useState<any>(null)
  const [currentFolder, setCurrentFolder] = useState<any>(null)
  const [path, setPath] = useState<any>([{ id: null, name: 'Mes ressources' }])
  // const [parentDirectoryId, setParentDirectoryId] = useState<any>(null)
  // const [prevParentDirectoryId, setPrevParentDirectoryId] = useState<any>(null)
  // const [parentDirectoryName, setParentDirectoryName] = useState<any>('Mes ressources')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const { refetch, error, data, loading } = useQuery(
    GET_FOLDERS_BY_CURRENT_USER_ID,
    {
      variables: {
        parentDirectory: (currentFolder && currentFolder.id) || '',
      },
    },
  )

  const handleClickOnRightArrow = (folder) => {
    const pathCopy = path.slice()
    pathCopy.push({ id: folder.id, name: folder.name })
    setPath(pathCopy)
    setCurrentFolder(folder)
  }

  const handleClickOnLeftArrow = () => {
    console.log(path.length - 1)
    setCurrentFolder(path[path.length - 2])
    const pathCopy = path.slice(0, -1)
    setPath(pathCopy)
  }

  useEffect(() => {
    if (
      data &&
      data.foldersByCurrentUserId &&
      data.foldersByCurrentUserId.folders
    ) {
      setFolders(data.foldersByCurrentUserId.folders)
    }
  }, [data])

  useEffect(() => {
    refetch()
  }, [currentFolder])

  // eslint-disable-next-line consistent-return
  const returnTree: any = () => {
    if (folders && folders.length > 0) {
      return folders.map((folder) => {
        // eslint-disable-next-line react/self-closing-comp
        return (
          <div className="move-folder-modal-content-items">
            <AiFillFolder />
            <p>{folder.name}</p>
            <div style={{ flex: 1 }} />
            <BsArrowRightCircle
              onClick={() => handleClickOnRightArrow(folder)}
            />
          </div>
        )
      })
    }
    if (folders && folders.length === 0) {
      return (
        <div className="move-folder-modal-content-items">
          <p>Dossier vide</p>
        </div>
      )
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="move-folder-modal-wrapper">
        <div className="move-folder-modal-header">
          <BsArrowLeftCircle onClick={() => handleClickOnLeftArrow()} />
          <p>{currentFolder ? currentFolder.name : 'Mes ressources'}</p>
        </div>
        <div className="move-folder-modal-content">{returnTree()}</div>
      </div>
    </Modal>
  )
}

export default MoveFolderModal
