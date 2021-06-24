/* eslint-disable react/no-unused-prop-types */
import React from 'react'

import { useQuery } from '@apollo/client'
import { useToasts } from 'react-toast-notifications'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import { FcFolder } from 'react-icons/fc'
import { GET_ASSETS } from './queries'
import './Assets.scss'
/* import AddAssets from './AddAssets' */

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
  likes?: number
}

const Assets: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ASSETS)
  const { addToast } = useToasts()

  if (error) {
    return <p>error</p>
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
      {/*   <AddAssets /> */}
      {data &&
        data.allAssets.map((el: TDataAssets) => {
          return (
            <div key={el.id} className="container_asset">
              <FcFolder size={150} />
              <p>{el.title}</p>
            </div>
          )
        })}
    </div>
  )
}

export default Assets
