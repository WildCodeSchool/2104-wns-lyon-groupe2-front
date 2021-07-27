/* eslint-disable */
import React from 'react'

import { useMutation, useQuery } from '@apollo/client'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import { FcFolder } from 'react-icons/fc'
import { BiPencil } from 'react-icons/bi'
import { MdDelete } from 'react-icons/md'
import 'react-contexify/dist/ReactContexify.min.css'
import { ContextMenu, ContextMenuTrigger } from 'react-contextmenu'
import { Link } from 'react-router-dom'
import { Alert } from '@material-ui/lab'

import { GET_ASSETS } from '../../graphql/queries'
import './Assets.scss'
import AddAssets from './AddAssets'
import { DELETE_ASSETS, UPDATE_ASSETS } from '../../graphql/mutations'

const LoadingContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

type TDataAssets = {
  id: any
  title: string
  type: string
  likes?: number
  createdAt?: string
}

const Assets: React.FC = () => {
  let input: any
  const { loading, error, data } = useQuery(GET_ASSETS)
  const [updateAssets] = useMutation(UPDATE_ASSETS)
  const [deleteAssets] = useMutation(DELETE_ASSETS, {
    refetchQueries: [
      {
        query: GET_ASSETS,
      },
    ],
  })

  const onDelete = (id: number) => {
    deleteAssets({ variables: { input: { id } } })
  }

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

  return (
    <div className="assets_container">
      <AddAssets />
      <div className="folders_container">
        {data.allAssets.length > 0 ? (
          data.allAssets.map(({ id, title }: TDataAssets) => {
            return (
              <div key={id} className="folder">
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
                    <div className="item" onClick={() => onDelete(id)}>
                      <MdDelete className="icon_menu" />
                      delete
                    </div>
                  </div>
                </ContextMenu>

                <p className="asset_title">{title}</p>

                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    updateAssets({
                      variables: { input: { id, title: input.value } },
                    })
                    input.value = ''
                  }}
                >
                  <input
                    ref={(node) => {
                      input = node
                    }}
                  />
                  <button type="submit">Update Assets</button>
                </form>
              </div>
            )
          })
        ) : (
          <Alert variant="outlined" severity="info">
            Vous n'avez aucun dossier dans votre espace de ressources
          </Alert>
        )}
      </div>
    </div>
  )
}

export default Assets
