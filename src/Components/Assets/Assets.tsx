/* eslint-disable no-restricted-syntax */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'

import { useQuery, useMutation } from '@apollo/client'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import { FcFolder } from 'react-icons/fc'
import { BiPencil } from 'react-icons/bi'
import 'react-contexify/dist/ReactContexify.min.css'
import { ContextMenu, ContextMenuTrigger } from 'react-contextmenu'
import { Link } from 'react-router-dom'
import { Alert } from '@material-ui/lab'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from 'react-beautiful-dnd'

import './Assets.scss'
import AddAssets from './AddAssets'
import { GET_FOLDERS_BY_CURRENT_USER_ID } from '../../graphql/queries'
import DeleteAssets from './DeleteAssets'
import UpdateAssets from './UpdateAssets'
import { UPDATE_FOLDER } from '../../graphql/mutations'

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
  const { loading, error, data, refetch } = useQuery(
    GET_FOLDERS_BY_CURRENT_USER_ID,
  )
  const [folder, setFolder] = useState([])
  const [updateFolder] = useMutation(UPDATE_FOLDER, {
    refetchQueries: [{ query: GET_FOLDERS_BY_CURRENT_USER_ID }],
  })

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
        console.log(sortedArray)
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

  if (error) {
    return <Alert severity="error">Problème de connexion au serveur</Alert>
  }

  if (loading) {
    return (
      <LoadingContainer>
        <Loader type="BallTriangle" color="#000000" height={80} width={80} />
      </LoadingContainer>
    )
  }

  const handleOnDragEnd = (result: DropResult) => {
    console.log(result)
    // case we want to reorder folders
    // eslint-disable-next-line prettier/prettier
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
      // if the folder is placed at the beginning of a section
      if (
        result.destination.index <= 0 &&
        sourceFolderSection !== destinationFolderSection
      ) {
        const previousFolder: any = folder[destinationFolderSection][0]
        newSequence = previousFolder.sequence - 1
      } else if (result.destination.index <= 0) {
        const previousFolder: any =
          folder[destinationFolderSection][result.destination.index]
        newSequence = previousFolder.sequence
      } else if (folder[destinationFolderSection][result.destination.index]) {
        const previousFolder: any =
          folder[destinationFolderSection][result.destination.index]
        newSequence = previousFolder.sequence
        // this case if trigger if the folder is placed at then end of the last section
        // } else if (!folder[destinationFolderSection][result.destination.index]) {
      } else {
        const previousFolder: any =
          folder[destinationFolderSection][result.destination.index - 1]
        newSequence = previousFolder.sequence
      }
      console.log(newSequence)
      for (const folderSection of folder) {
        for (const fol of folderSection) {
          if (fol.id === result.draggableId)
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

  //   if (!result.destination) return
  //   if (
  //     result.destination.index === result.source.index &&
  //     result.destination.droppableId === result.source.droppableId
  //   ) {
  //     return
  //   }
  //   const items = Array.from(folder)
  //   const [reorderedItem] = items.splice(result.source.index, 1)
  //   items.splice(result.destination.index, 0, reorderedItem)

  //   setFolder(items)

  return (
    <div className="assets_container">
      <AddAssets />
      <div className="folders_container">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {folder.map((f: any, i: any) => {
            return (
              <Droppable
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
                                className="folder"
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                              >
                                <ContextMenuTrigger id={id}>
                                  <Link to={`assets/${id}`}>
                                    <FcFolder className="folder_icon" />
                                  </Link>
                                </ContextMenuTrigger>
                                <ContextMenu id={id} className="item_menu">
                                  <div id="context-menu">
                                    <div className="item">
                                      <BiPencil className="icon_menu" />
                                      rename
                                    </div>
                                    <hr />
                                    <DeleteAssets id={id} />
                                  </div>
                                </ContextMenu>
                                <UpdateAssets id={id} name={name} />
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
      </div>
    </div>
  )
}

export default Assets
