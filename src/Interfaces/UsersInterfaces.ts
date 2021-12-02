import { History } from 'history'
import React from 'react'

export interface iUsers {
  id?: string
  firstname?: string
  lastname?: string
  avatar?: string
  email?: string
  schoolId?: string
  themeId?: string
  color: string
  isSchoolAdmin?: boolean
  userType?: string
  exp?: number
  iat?: number
  avatarUrl?: string
  backgroundUrl?: string
}

export interface iNewUser {
  email: string
  firstname: string
  isSchoolAdmin: boolean
  lastname: string
  schoolId: string
  userType?: string
}

export interface iTokenDecrypted {
  // eslint-disable-next-line camelcase
  first_connection: boolean
  email: string
  exp: number
  firstname: string
  iat: number
  isSchoolAdmin: boolean
  color: string
  lastname: string
  schoolId: string
  userId: string
  userType: string
}

export interface iXLSXUser {
  Prénom: string
  Nom: string
  Email: string
  Catégorie: string
}

export interface InputPasswordRecovery {
  userId: string
  token: string
}

export interface InputToChangePassword {
  userId: string
  password: string
  // eslint-disable-next-line camelcase
  first_connection: boolean
}

export interface UserProfileProps {
  userInfos: iUsers
}
