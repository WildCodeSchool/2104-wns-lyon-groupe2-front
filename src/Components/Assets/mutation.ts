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
