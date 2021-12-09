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
export const UPLOAD_ASSETS = gql`
  mutation uploadAssets(
    $data: Upload!
    $folderId: String!
    $tagsSelected: [InputTag]
  ) {
    uploadAssets(
      data: $data
      folderId: $folderId
      tagsSelected: $tagsSelected
    ) {
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
        avatarUrl
        backgroundUrl
        email
        isSchoolAdmin
        city
      }
    }
  }
`

export const ADD_USER = gql`
  mutation registerUser($input: InputUser!) {
    registerUser(input: $input) {
      email
      lastname
      firstname
    }
  }
`

export const UPLOAD_USER_PROFIL = gql`
  mutation uploadUserProfil($data: Upload!, $type: String!) {
    uploadUserProfil(data: $data, type: $type) {
      token
    }
  }
`

export const GET_USER_BY_ID = gql`
  query Query($input: UserId!) {
    getUserByID(input: $input) {
      id
      lastname
      firstname
      avatar
      email
      color
      schoolId
      userType
      isSchoolAdmin
    }
  }
`

export const SIGNUP_MUTATION = gql`
  mutation Mutation($createSchoolInput: InputSchool!) {
    createSchool(input: $createSchoolInput) {
      data {
        id
        firstname
        schoolName
      }
      user {
        id
        firstname
      }
      workspace {
        id
        title
      }
    }
  }
`
