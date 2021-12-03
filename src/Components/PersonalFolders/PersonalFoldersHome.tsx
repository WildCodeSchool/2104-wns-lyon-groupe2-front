/* eslint-disable no-restricted-syntax */
/* eslint-disable prettier/prettier */
import React, { useContext, useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import { FcFolder } from 'react-icons/fc'
import { BiPencil } from 'react-icons/bi'
import 'react-contexify/dist/ReactContexify.min.css'
import { ContextMenu, ContextMenuTrigger, MenuItem } from 'react-contextmenu'
import { withRouter } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
import { MdDelete, MdOutlineDriveFileMove } from 'react-icons/md'
import Modal from '@material-ui/core/Modal'
import { Button, TextField, Tooltip } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'
import './Folders.scss'
import { useToasts } from 'react-toast-notifications'
import FolderIcon from '@material-ui/icons/Folder'
import { returnMessageForAnErrorCode } from '../../Tools/ErrorHandler'
import MoveFolderModal from './MoveFolderModal'
import {
  GET_FOLDERS_BY_CURRENT_USER_ID,
  GET_FOLDER_ASSETS,
} from '../../graphql/queries'

import { UPDATE_FOLDER, DELETE_FOLDER } from '../../graphql/mutations'
import { SidebarContext } from '../Context/SidebarContext'
import AssetsTable from './Assets/AssetsTable'
import ModalContainer from './ModalContainer'

import { ITags } from '../../Interfaces/Assets'
import Navbar from '../Feed/Navbar/Navbar'
import Searchbar from '../Feed/Navbar/Searchbar'
import { TDataFolders, TDataFoldersPath } from '../../Interfaces/Folders'

const LoadingContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const PersonalFoldersHome: React.FC = ({ match, history }: any) => {
  // ////// //
  // STATES //
  // ////// //
  const [rowsToRework, setRowsToRework] = useState([])
  const [updateComponent, setUpdateComponent] = useState<boolean>(false)
  const { addToast } = useToasts()
  const [folders, setFolders] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [path, setPath] = useState<null | [TDataFoldersPath]>(null)
  const [newName, setNewName] = useState<null | string>(null)
  const [sameNameError, setSameNameError] = useState<boolean>(false)
  const [selectedFolder, setSelectedFolder] = useState<null | string>(null)
  const [selectedFolderIdForMove, setSelectedFolderIdForMove] = useState<
    null | string
  >(null)
  const [folderToDelete, setFolderToDelete] = useState<null | string>(null)
  const [isMoveFolderModalOpen, setIsMoveFolderModalOpen] =
    useState<boolean>(false)
  const { setIsWorkspaceDisplayed } = useContext(SidebarContext)

  //  /// //
  // MISC //
  // //// //

  const parentDirectory =
    match.params && match.params.parentId ? match.params.parentId : ''

  // ///////// //
  // MUTATIONS //
  // ///////// //

  const { refetch, error, data, loading } = useQuery(
    GET_FOLDERS_BY_CURRENT_USER_ID,
    {
      variables: {
        parentDirectory,
      },
    },
  )
  const {
    loading: assetLoading,
    error: assetError,
    data: assetData,
    refetch: assetRefetch,
  } = useQuery(GET_FOLDER_ASSETS, {
    variables: {
      folderId: parentDirectory,
    },
  })

  const [updateFolder] = useMutation(UPDATE_FOLDER, {
    onCompleted: () => {
      setNewName(null)
      setSameNameError(false)
      refetch()
    },
    onError: (err) => {
      if (
        !newName &&
        err.message === 'A folder with same name has been found'
      ) {
        const errorMessage = returnMessageForAnErrorCode('109')
        addToast(`${errorMessage}`, {
          appearance: 'error',
          autoDismiss: true,
        })
        setIsLoading(false)
      }
      if (newName && err.message === 'A folder with same name has been found') {
        setSameNameError(true)
      }
    },
  })

  const [deleteFolder] = useMutation(DELETE_FOLDER, {
    onCompleted: () => {
      refetch()
    },
  })

  const removeFolder = (id: string) => {
    deleteFolder({ variables: { input: { id } } })
    setFolderToDelete(null)
  }

  const submitNewName = (
    e: React.KeyboardEvent<HTMLDivElement>,
    id: string,
  ) => {
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

  // //////////// //
  // RENDER FUNCS //
  // //////////// //

  const useStyles = makeStyles({
    arrow: {
      '&:before': {
        border: 'solid 1px #f44336',
      },
      color: '#f44336',
    },
    tooltip: {
      backgroundColor: 'white',
      border: 'solid 1px #f44336',
      color: '#f44336',
    },
  })

  const classes = useStyles()

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

  // ////////// //
  // USE EFFECT //
  // ////////// //

  useEffect(() => {
    setIsWorkspaceDisplayed(false)
    if (data) {
      const result: any = []
      let temporaryArray: any = []
      setPath(data.foldersByCurrentUserId.path)
      if (
        data.foldersByCurrentUserId &&
        data.foldersByCurrentUserId.folders &&
        data.foldersByCurrentUserId.folders.length > 0
      ) {
        const sortedArray = data.foldersByCurrentUserId.folders
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
        setFolders(result)
      } else {
        setFolders(data.foldersByCurrentUserId.folders)
      }
    }
  }, [data, match.params.id])

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 400)
  }, [folders])
  useEffect(() => {
    if (assetData) {
      setRowsToRework(assetData.getAssetsByFolderId)
    }
    assetRefetch()
  }, [assetData, updateComponent])

  if (error) {
    return <Alert severity="error">Problème de connexion au serveur</Alert>
  }

  if (loading) {
    returnLoader()
  }
  // /// //
  // DND //
  // /// //

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
      setSameNameError(false)
    }
  }

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return
    }
    if (
      result?.source?.droppableId === result?.destination?.droppableId &&
      result?.source?.index === result?.destination?.index
    ) {
      return
    }
    if (result?.destination?.droppableId?.includes('path')) {
      if (result.destination.droppableId.slice(5) === parentDirectory) {
        return
      }
      let selectedDirectoryId = result.destination.droppableId.slice(5)
      if (selectedDirectoryId === '') {
        selectedDirectoryId = 'root'
      }
      for (const folderSection of folders) {
        for (const fol of folderSection) {
          if (fol.id === result.draggableId) {
            updateFolder({
              variables: {
                input: {
                  id: fol.id,
                  name: fol.name,
                  sequence: null,
                  isRootDirectory: fol.isRootDirectory,
                  parentDirectory: selectedDirectoryId,
                },
              },
            })
          }
        }
      }
    }
    setIsLoading(true)
    if (result.combine) {
      for (const folderSection of folders) {
        for (const fol of folderSection) {
          if (fol.id === result.draggableId) {
            updateFolder({
              variables: {
                input: {
                  id: fol.id,
                  name: fol.name,
                  sequence: null,
                  isRootDirectory: fol.isRootDirectory,
                  parentDirectory: result.combine.draggableId,
                },
              },
            })
          }
        }
      }
      return
    }
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
        const previousFolder: any = folders[destinationFolderSection][0]
        newSequence =
          previousFolder.sequence === 0 ? 0 : previousFolder.sequence - 1
        // if the folder is placed at the beginning of a section and folders section are same
      } else if (
        result.destination.index > 0 &&
        sourceFolderSection !== destinationFolderSection
      ) {
        const previousFolder: any =
          folders[destinationFolderSection][result.destination.index - 1]
        newSequence = previousFolder.sequence
      } else if (result.destination.index <= 0) {
        const previousFolder: any =
          folders[destinationFolderSection][result.destination.index]
        newSequence = previousFolder.sequence
        // general case
      } else if (folders[destinationFolderSection][result.destination.index]) {
        const previousFolder: any =
          folders[destinationFolderSection][result.destination.index]
        newSequence = previousFolder.sequence
        // this case if trigger if the folder is placed at then end of the last section
      } else {
        const previousFolder: any =
          folders[destinationFolderSection][result.destination.index - 1]
        newSequence = previousFolder.sequence
      }
      for (const folderSection of folders) {
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

  // ////// //
  // RETURN //
  // ////// //

  return (
    <div
      className="folders_container"
      id="folders_container"
      onClick={(e) => getClickOutsideOfTextField(e)}
    >
      <div
        style={{
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          width: '100%',
          height: 100,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Searchbar />
        <Navbar />
      </div>
      <ModalContainer
        refetch={refetch}
        parentId={parentDirectory}
        setUpdateComponent={setUpdateComponent}
        updateComponent={updateComponent}
      />
      <div className="folders_container">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <div className="folders_container_navigation_bar">
            {path &&
              path.map((level) => {
                return (
                  <Droppable droppableId={`path-${level.id}`}>
                    {(provided, snapshot) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        <span
                          className="folders_container_navigation_bar_folder"
                          onClick={() =>
                            history.push(`/personal-folders/${level.id}`)
                          }
                        >
                          {level.name}
                        </span>
                        <span>{' > '}</span>
                      </div>
                    )}
                  </Droppable>
                )
              })}
          </div>
          {folders &&
            folders &&
            folders.length > 0 &&
            folders.map((f: any, i: any) => {
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
                              {(provided, snapshot) => (
                                <li
                                  key={id}
                                  className="folder"
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  ref={provided.innerRef}
                                >
                                  <ContextMenuTrigger id={id}>
                                    <FolderIcon
                                      style={{ color: '#F5A454' }}
                                      className="folder_icon"
                                      onClick={() =>
                                        history.push(`/personal-folders/${id}`)
                                      }
                                    />
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
                                      <div
                                        className="context_menu_section"
                                        onClick={() => setFolderToDelete(id)}
                                      >
                                        <MdDelete className="icon_menu" />
                                        <MenuItem className="item">
                                          Supprimer
                                        </MenuItem>
                                      </div>
                                      <div
                                        className="context_menu_section"
                                        onClick={() => {
                                          setSelectedFolderIdForMove(id)
                                          setIsMoveFolderModalOpen(true)
                                        }}
                                      >
                                        <MdOutlineDriveFileMove className="icon_menu" />{' '}
                                        <MenuItem>Déplacer</MenuItem>
                                      </div>
                                    </div>
                                  </ContextMenu>
                                  {newName !== null && selectedFolder === id ? (
                                    <Tooltip
                                      classes={{
                                        tooltip: classes.tooltip,
                                        arrow: classes.arrow,
                                      }}
                                      arrow
                                      open={sameNameError}
                                      title="Un dossier portant ce nom existe déjà"
                                    >
                                      <TextField
                                        variant="outlined"
                                        className="folder_title"
                                        onChange={(e) =>
                                          setNewName(e.target.value)
                                        }
                                        value={newName}
                                        onKeyDown={(e) => submitNewName(e, id)}
                                        error={sameNameError}
                                      />
                                    </Tooltip>
                                  ) : (
                                    <p
                                      onDoubleClick={() => {
                                        setNewName(name)
                                        setSelectedFolder(id)
                                      }}
                                      className="folder_title"
                                    >
                                      {name}
                                    </p>
                                  )}
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
            <div className="add_folder_modal">
              <p>Souhaitez-vous réellement supprimer ce dossier ?</p>
              <div className="add_folder_modal_action_bar">
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
        {isMoveFolderModalOpen && (
          <MoveFolderModal
            refetch={refetch}
            folderToMove={selectedFolderIdForMove}
            open={isMoveFolderModalOpen}
            setOpen={setIsMoveFolderModalOpen}
          />
        )}
      </div>
      {rowsToRework && (
        <div className="assets_list_container">
          <AssetsTable
            assetsList={rowsToRework}
            setUpdateComponent={setUpdateComponent}
            updateComponent={updateComponent}
          />
        </div>
      )}
    </div>
  )
}

export default withRouter(PersonalFoldersHome)
