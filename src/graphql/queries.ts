import { gql } from '@apollo/client'

export const GET_ASSETS = gql`
  query allAssets {
    allAssets {
      id
      title
      type
      likes
    }
  }
`
