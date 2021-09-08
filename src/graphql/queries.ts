import { gql } from '@apollo/client'

export const GET_FOLDERS_BY_CURRENT_USER_ID = gql`
  query foldersByCurrentUserId {
    foldersByCurrentUserId {
      id
      userId
      createdAt
      name
      children
      isRootDirectory
    }
  }
`
