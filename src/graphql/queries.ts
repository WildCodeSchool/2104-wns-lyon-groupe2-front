import { gql } from '@apollo/client'

export const GET_FOLDERS_BY_CURRENT_USER_ID = gql`
  query foldersByCurrentUserId($parentDirectory: String) {
    foldersByCurrentUserId(parentDirectory: $parentDirectory) {
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
