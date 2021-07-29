import { gql } from '@apollo/client'

export const GET_FOLDERS = gql`
  query allFolders {
    allFolders {
      id
      userId
      createdAt
      name
      children
      isRootDirectory
    }
  }
`
