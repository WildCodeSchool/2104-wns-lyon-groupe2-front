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
import { GET_FOLDERS } from '../../graphql/queries'
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
  const { loading, error, data } = useQuery(GET_FOLDERS)
  const [folder, setFolder] = useState([])
  console.log(data)

  useEffect(() => {
    if (data) {
      setFolder(data.allFolders)
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
    if (!result.destination) return
    if (
      result.destination.index === result.source.index &&
      result.destination.droppableId === result.source.droppableId
    ) {
      return
    }
    const items = Array.from(folder)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setFolder(items)
  }

  return (
    <div className="assets_container">
      <AddAssets />
      <div className="folders_container">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="folders_container" direction="horizontal">
            {(provid) => (
              <ul
                className="folders_container"
                {...provid.droppableProps}
                ref={provid.innerRef}
              >
                {folder &&
                  folder.map(({ id, name }: TDataFolders, index: number) => {
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
        </DragDropContext>
      </div>
    </div>
  )
}

export default Assets
