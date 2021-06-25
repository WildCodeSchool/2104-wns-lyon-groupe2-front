import { gql } from '@apollo/client'

export const CREATE_ASSETS = gql`
  mutation createAsset($input: InputAsset!) {
    createAsset(input: $input) {
      title
      type
      likes
    }
  }
`

export const UPDATE_ASSETS = gql`
  mutation updateAsset($input: UpdateAsset!) {
    updateAsset(input: $input) {
      id
      title
      type
      likes
    }
  }
`

export const DELETE_ASSETS = gql`
  mutation deleteAsset($input: AssetId!) {
    deleteAsset(input: $input)
  }
`
