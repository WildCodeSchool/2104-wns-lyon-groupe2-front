import { gql } from '@apollo/client'

export const GET_FOLDERS_BY_CURRENT_USER_ID = gql`
  query foldersByCurrentUserId {
    foldersByCurrentUserId {
      id
      userId
      createdAt
      name
      parentDirectory
      isRootDirectory
      sequence
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
