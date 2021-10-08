import { gql } from '@apollo/client'

export const CREATE_FOLDER = gql`
  mutation createFolder($input: InputFolder!) {
    createFolder(input: $input) {
      name
      parentDirectory
      isRootDirectory
    }
  }
`

export const UPDATE_FOLDER = gql`
  mutation updateFolder($input: UpdateFolder!) {
    updateFolder(input: $input) {
      id
      name
      parentDirectory
      isRootDirectory
      sequence
    }
  }
`

export const DELETE_FOLDER = gql`
  mutation deleteFolder($input: FolderId!) {
    deleteFolder(input: $input)
  }
`

export const IS_AUTH = gql`
  mutation isAuth($input: Token!) {
    isAuth(input: $input) {
      auth
      message
    }
  }
`
