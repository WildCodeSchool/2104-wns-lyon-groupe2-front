/* eslint-disable react/no-unused-prop-types */
import React, { useEffect, useState } from 'react'

import { useQuery, gql } from '@apollo/client'

// const GET_ASSETS = gql`
//   query {
//     allAssets {
//       id
//       title
//       type
//       likes
//     }
//   }
// `

const GET_ASSETS = gql`
  query allAssets {
    assets {
      id
      title
      type
      likes
    }
  }
`

type TDataAssets = {
  id: number
  title: string
  type: string
  likes: number
}

const Assets: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ASSETS)
  const [assets, setAssets] = useState([])

  useEffect(() => {
    setAssets(data)
  }, [data])

  if (loading) return <p>loading...</p>
  if (error) return <p>Error</p>

  return (
    <div className="container_assets" style={{ height: 700 }}>
      {/* {data.allAssets.map((asset: TDataAssets) => (
        <div key={asset.id}>
          <p>{asset.title}</p>
        </div>
      ))} */}
      <p>{data}</p>
      {/* {assets.map((el: TDataAssets) => {
        return <div>{el.title}</div>
      })} */}
    </div>
  )
}

export default Assets
