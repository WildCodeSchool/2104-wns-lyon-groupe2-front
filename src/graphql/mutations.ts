import { gql } from '@apollo/client'

export const CREATE_FOLDER = gql`
  mutation createFolder($input: InputFolder!) {
    createFolder(input: $input) {
      name
      children
      isRootDirectory
    }
  }
`

export const UPDATE_FOLDER = gql`
  mutation updateFolder($input: UpdateFolder!) {
    updateFolder(input: $input) {
      id
      name
      children
      isRootDirectory
    }
  }
`

export const DELETE_FOLDER = gql`
  mutation deleteFolder($input: FolderId!) {
    deleteFolder(input: $input)
  }
`
