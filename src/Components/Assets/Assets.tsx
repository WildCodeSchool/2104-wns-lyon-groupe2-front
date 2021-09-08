import React, { useEffect, useState } from 'react'

import { useQuery } from '@apollo/client'
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
  children: number[]
  isRootDirectory?: boolean
}

const Assets: React.FC = () => {
  const { loading, error, data } = useQuery(GET_FOLDERS_BY_CURRENT_USER_ID)
  const [folder, setFolder] = useState([])

  useEffect(() => {
    if (data) {
      const result: any = []
      let temporaryArray: any = []
      if (
        data.foldersByCurrentUserId &&
        data.foldersByCurrentUserId.length > 0
      ) {
        for (let i = 0; i < data.foldersByCurrentUserId.length; i += 1) {
          if (temporaryArray.length % 5 === 0 && temporaryArray.length > 1) {
            result.push(temporaryArray)
            temporaryArray = []
          }
          temporaryArray.push(data.foldersByCurrentUserId[i])
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
  }

  return (
    <div className="assets_container">
      <AddAssets />
      <div className="folders_container">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {folder.map((f: any, i: any) => {
            return (
              <Droppable
                droppableId={i.toString()}
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
