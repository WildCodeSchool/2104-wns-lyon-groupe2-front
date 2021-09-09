/* eslint-disable no-restricted-syntax */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'

import { useQuery, useMutation } from '@apollo/client'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import { FcFolder } from 'react-icons/fc'
import { BiPencil, BiWindows } from 'react-icons/bi'
import 'react-contexify/dist/ReactContexify.min.css'
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu'
import { Link } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
import { MdDelete } from 'react-icons/md'
import Modal from '@material-ui/core/Modal'
import { Button, Popover, TextField } from '@material-ui/core'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import './Assets.scss'
import AddFolder from './AddFolder'
import { GET_FOLDERS_BY_CURRENT_USER_ID } from '../../graphql/queries'
import { UPDATE_FOLDER, DELETE_FOLDER } from '../../graphql/mutations'

const LoadingContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

type TDataFolders = {
  id: string
  userId: string
  createdAt: string
  name: string
  parentDirectory: string
  isRootDirectory?: boolean
  sequence: number
}

const Assets: React.FC = () => {
  // STATES
  const [folder, setFolder] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [newName, setNewName] = useState<null | string>(null)
  const [selectedFolder, setSelectedFolder] = useState<null | string>(null)
  const [folderToDelete, setFolderToDelete] = useState<null | string>(null)

  // MUTATIONS
  const { loading, error, data, refetch } = useQuery(
    GET_FOLDERS_BY_CURRENT_USER_ID,
  )
  const [updateFolder] = useMutation(UPDATE_FOLDER, {
    onCompleted: () => setNewName(null),
    refetchQueries: [{ query: GET_FOLDERS_BY_CURRENT_USER_ID }],
  })
  const [deleteFolder] = useMutation(DELETE_FOLDER, {
    refetchQueries: [{ query: GET_FOLDERS_BY_CURRENT_USER_ID }],
  })

  const removeFolder = (id: string) => {
    deleteFolder({ variables: { input: { id } } })

    setFolderToDelete(null)
  }

  const submitNewName = (e, id) => {
    if (e.key === 'Enter') {
      updateFolder({
        variables: {
          input: { id, name: newName, sequence: null },
        },
      })
    } else if (e.key === 'Escape') {
      setNewName(null)
    }
  }

  const getClickOutsideOfTextField = (e) => {
    const element = e.target as HTMLTextAreaElement
    if (
      newName &&
      selectedFolder &&
      element.className !== 'MuiInputBase-input MuiOutlinedInput-input' &&
      element.className !== 'context_menu_section'
    ) {
      setNewName(null)
      setSelectedFolder(null)
    }
  }

  const returnLoader = () => {
    return (
      <div
        style={{
          backgroundColor: '#f8f9fa',
          opacity: '0.9',
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
      >
        <LoadingContainer>
          <Loader type="BallTriangle" color="#000000" height={80} width={80} />
        </LoadingContainer>
      </div>
    )
  }

  useEffect(() => {
    if (data) {
      const result: any = []
      let temporaryArray: any = []
      if (
        data.foldersByCurrentUserId &&
        data.foldersByCurrentUserId.length > 0
      ) {
        const sortedArray = data.foldersByCurrentUserId
          .slice()
          .sort((a: any, b: any) => a.sequence - b.sequence)
        for (let i = 0; i < sortedArray.length; i += 1) {
          if (temporaryArray.length % 5 === 0 && temporaryArray.length > 1) {
            result.push(temporaryArray)
            temporaryArray = []
          }
          temporaryArray.push(sortedArray[i])
        }
        if (temporaryArray.length > 0) {
          result.push(temporaryArray)
        }
        setFolder(result)
      }
    }
  }, [data])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 400)
  }, [folder])

  if (error) {
    return <Alert severity="error">Problème de connexion au serveur</Alert>
  }

  if (loading) {
    returnLoader()
  }

  const handleOnDragEnd = (result: DropResult) => {
    if (
      (result?.source?.droppableId === result?.destination?.droppableId &&
        result?.source?.index === result?.destination?.index) ||
      result.combine
    ) {
      return
    }
    setIsLoading(true)

    // case we want to reorder folders
    if (
      result?.destination?.droppableId.includes('drop') &&
      result?.source?.droppableId.includes('drop')
    ) {
      const sourceFolderSection = parseInt(
        result?.source?.droppableId.slice(5),
        10,
      )
      const destinationFolderSection = parseInt(
        result?.destination?.droppableId.slice(5),
        10,
      )

      let newSequence: number
      // if the folder is placed at the beginning of a section and folders section is different
      if (
        result.destination.index <= 0 &&
        sourceFolderSection !== destinationFolderSection
      ) {
        const previousFolder: any = folder[destinationFolderSection][0]
        newSequence =
          previousFolder.sequence === 0 ? 0 : previousFolder.sequence - 1
        // if the folder is placed at the beginning of a section and folders section are same
      } else if (
        result.destination.index > 0 &&
        sourceFolderSection !== destinationFolderSection
      ) {
        const previousFolder: any =
          folder[destinationFolderSection][result.destination.index - 1]
        newSequence = previousFolder.sequence
      } else if (result.destination.index <= 0) {
        const previousFolder: any =
          folder[destinationFolderSection][result.destination.index]
        newSequence = previousFolder.sequence
        // general case
      } else if (folder[destinationFolderSection][result.destination.index]) {
        const previousFolder: any =
          folder[destinationFolderSection][result.destination.index]
        newSequence = previousFolder.sequence
        // this case if trigger if the folder is placed at then end of the last section
      } else {
        const previousFolder: any =
          folder[destinationFolderSection][result.destination.index - 1]
        newSequence = previousFolder.sequence
      }

      // console.log(newSequence)
      for (const folderSection of folder) {
        for (const fol of folderSection) {
          if (fol.id === result.draggableId) {
            updateFolder({
              variables: {
                input: {
                  id: fol.id,
                  name: fol.name,
                  sequence: newSequence,
                  isRootDirectory: fol.isRootDirectory,
                  parentDirectory: fol.parentDirectory,
                },
              },
            })
          }
        }
      }
    }
  }

  return (
    <div
      className="assets_container"
      id="assets_container"
      onClick={(e) => getClickOutsideOfTextField(e)}
    >
      <AddFolder />
      <div className="folders_container">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {folder.map((f: any, i: any) => {
            return (
              <Droppable
                key={f.id}
                droppableId={`${'drop-'}${i.toString()}`}
                direction="horizontal"
                isCombineEnabled
              >
                {(provid) => (
                  <ul
                    className="folders_container"
                    {...provid.droppableProps}
                    ref={provid.innerRef}
                  >
                    {f &&
                      f.map(({ id, name }: TDataFolders, index: number) => {
                        return (
                          <Draggable key={id} draggableId={id} index={index}>
                            {(provided) => (
                              <li
                                key={id}
                                className="folder"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <ContextMenuTrigger id={id}>
                                  {/* {/* <Link to={`assets/${id}`}> */}
                                  <FcFolder className="folder_icon" />
                                  {/* </Link> */}
                                </ContextMenuTrigger>
                                <ContextMenu id={id}>
                                  <div id="context-menu">
                                    <div
                                      className="context_menu_section"
                                      onClick={() => {
                                        setNewName(name)
                                        setSelectedFolder(id)
                                      }}
                                    >
                                      <BiPencil className="icon_menu" />{' '}
                                      <MenuItem>Renommer</MenuItem>
                                    </div>
                                    <div className="context_menu_section">
                                      <MdDelete className="icon_menu" />
                                      <MenuItem
                                        className="item"
                                        onClick={() => setFolderToDelete(id)}
                                      >
                                        Supprimer
                                      </MenuItem>
                                    </div>
                                  </div>
                                </ContextMenu>
                                <>
                                  {newName !== null && selectedFolder === id ? (
                                    <TextField
                                      variant="outlined"
                                      className="asset_title"
                                      onChange={(e) =>
                                        setNewName(e.target.value)
                                      }
                                      value={newName}
                                      onKeyDown={(e) => submitNewName(e, id)}
                                    />
                                  ) : (
                                    <p
                                      onDoubleClick={() => {
                                        setNewName(name)
                                        setSelectedFolder(id)
                                      }}
                                      className="asset_title"
                                    >
                                      {name}
                                    </p>
                                  )}
                                </>
                              </li>
                            )}
                          </Draggable>
                        )
                      })}
                    {provid.placeholder}
                  </ul>
                )}
              </Droppable>
            )
          })}
        </DragDropContext>
        {isLoading && returnLoader()}
        {folderToDelete && (
          <Modal open={!!folderToDelete}>
            <div className="add_asset_modal">
              <p>Souhaitez-vous réellement supprimer ce dossier ?</p>
              <div className="add_asset_modal_action_bar">
                <Button
                  onClick={() => setFolderToDelete(null)}
                  variant="contained"
                >
                  Annuler
                </Button>
                <Button
                  onClick={() => removeFolder(folderToDelete)}
                  color="primary"
                  variant="contained"
                >
                  Supprimer
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default Assets
