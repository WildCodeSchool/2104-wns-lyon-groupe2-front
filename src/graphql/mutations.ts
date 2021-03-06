import { gql } from '@apollo/client'

export const DELETE_ASSETS = gql`
  mutation deletAsset($input: [String]!) {
    deleteAsset(input: $input)
  }
`

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

export const UPLOAD_FILE = gql`
  mutation uploadFile($data: Upload!, $folderId: String!) {
    uploadFile(data: $data, folderId: $folderId) {
      url
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation login($input: InputLogin!) {
    login(input: $input) {
      token
    }
  }
`
export const MOVE_FOLDER = gql`
  mutation moveFolder($input: UpdateFolder!) {
    moveFolder(input: $input) {
      id
    }
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
