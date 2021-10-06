import { gql } from '@apollo/client'

export const GET_FOLDERS_BY_CURRENT_USER_ID = gql`
  query foldersByCurrentUserId($parentDirectory: String) {
    foldersByCurrentUserId(parentDirectory: $parentDirectory) {
      path {
        name
        id
      }
      folders {
        id
        userId
        createdAt
        name
        parentDirectory
        isRootDirectory
        sequence
      }
    }
  }
`

export const GET_FOLDER_DETAILS = gql`
  query getFolderById($folderId: String!) {
    getFolderById(folderId: $folderId) {
      name
      createdAt
    }
  }
`
type Assets = {
  title: string
}
export const GET_FOLDER_ASSETS = gql`
  query getAssetsByFolderId($folderId: String!) {
    getAssetsByFolderId(folderId: $folderId) {
      title
      createdAt
      url
      id
    }
  }
`
export const GET_FOLDER_PATH = gql`
  query getPath($parentDirectory: String) {
    getPath(parentDirectory: $parentDirectory)
  }
`
