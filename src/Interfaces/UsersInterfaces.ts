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
