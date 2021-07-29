export interface iUsers {
  id?: number
  firstname?: string
  lastname?: string
  avatar?: string
  email?: string
  schoolIdd?: string
  themeId?: string
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
  email: string
  exp: number
  firstname: string
  iat: number
  isSchoolAdmin: boolean
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
