import { gql } from '@apollo/client'
import { ITags } from '../Interfaces/Assets'

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
// Here add tagsSelected type
export const UPLOAD_FILE = gql`
  mutation uploadFile(
    $data: Upload!
    $folderId: String!
    $tagsSelected: [InputTag]
  ) {
    uploadFile(data: $data, folderId: $folderId, tagsSelected: $tagsSelected) {
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
export const SEARCH = gql`
  mutation search($input: InputSearch!) {
    search(input: $input) {
      assets {
        _id
        title
        createdAt
        updatedAt
        url
        type
        tags
        lastView
        likes
        dislikes
        bookmarkedCount
        openingCount
      }
      folders {
        _id
        sequence
        userId
        createdAt
        name
        parentDirectory
        isRootDirectory
        path
      }
      users {
        _id
        lastname
        firstname
        avatar
        email
        isSchoolAdmin
        city
      }
    }
  }
`
