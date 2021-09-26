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

export const GET_FOLDER_PATH = gql`
  query getPath($parentDirectory: String) {
    getPath(parentDirectory: $parentDirectory)
  }
`
