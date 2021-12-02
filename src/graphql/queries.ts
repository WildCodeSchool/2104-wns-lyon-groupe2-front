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

export const GET_FOLDER_ASSETS = gql`
  query getAssetsByFolderId($folderId: String!) {
    getAssetsByFolderId(folderId: $folderId) {
      id
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
  }
`
export const GET_FOLDER_PATH = gql`
  query getPath($parentDirectory: String) {
    getPath(parentDirectory: $parentDirectory)
  }
`

export const GET_FOLDERS_TREE = gql`
  query getFoldersTree {
    getFoldersTree {
      id
      name
    }
  }
`

export const GET_ALL_TAGS = gql`
  query getAllTags {
    getAllTags {
      id
      label
    }
  }
`

export const GET_WORKSPACES = gql`
  query getWorkspaceById($input: WorkspaceId!) {
    getWorkspaceById(input: $input) {
      id
      title
      schoolId
      feed {
        id
        feedName
        messages {
          id
          content
          userId
          userName
          color
          createdAt
          comments {
            id
            content
            userId
            userName
            color
            createdAt
          }
          likes {
            userId
            userName
          }
          dislikes {
            userId
            userName
          }
        }
      }
    }
  }
`
