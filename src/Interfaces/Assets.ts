export interface IAssetsDetails {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  url: string
  type: string
  tags: string[]
  lastView: string
  likes: number
  dislikes: number
  bookmarkedCount: number
  openingCount: number
}

export interface IAssetsProps {
  folderId: string
}

export interface IFolderDetails {
  name: string
  createdAt: string
}

export interface IGridProps {
  assetsList?: IAssetsDetails[]
}
