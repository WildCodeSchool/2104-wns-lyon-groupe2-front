/* eslint-disable react/no-unused-prop-types */
import React from 'react'

import { useMutation, useQuery } from '@apollo/client'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import { FcFolder } from 'react-icons/fc'
import { GET_ASSETS } from '../../graphql/queries'
import './Assets.scss'
import AddAssets from './AddAssets'
import { DELETE_ASSETS, UPDATE_ASSETS } from '../../graphql/mutations'

const FallBackContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

type TDataAssets = {
  id: number
  title: string
  type: string
  likes: number
}

const Assets: React.FC = () => {
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
    return <p>Error ):</p>
  }

  if (loading) {
    return (
      <FallBackContainer>
        <Loader type="BallTriangle" color="#000000" height={80} width={80} />
      </FallBackContainer>
    )
  }

  return (
    <div className="container_assets">
      <AddAssets />
      {data &&
        data.allAssets.map(({ id, title }: TDataAssets) => {
          let input: any
          return (
            <div key={id} className="container_asset">
              <FcFolder size={150} />
              <p>{title}</p>
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
              <button type="button" onClick={() => onDelete(id)}>
                x
              </button>
            </div>
          )
        })}
    </div>
  )
}

export default Assets
