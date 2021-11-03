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
