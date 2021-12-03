export type TDataFolders = {
  id: string
  userId: string
  createdAt: string
  name: string
  parentDirectory: string
  isRootDirectory?: boolean
  sequence: number
}
export type TDataFoldersPath = {
  name: string
  id: string
}
