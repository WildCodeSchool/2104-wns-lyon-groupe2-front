import { Dispatch, SetStateAction } from 'react'

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
  setUpdateComponent: Dispatch<any>
  updateComponent: boolean
}

export interface IFolderDetails {
  name: string
  createdAt: string
}

export interface IGridProps {
  assetsList: IAssetsDetails[]
  updateComponent: boolean
  setUpdateComponent: Dispatch<any>
}
export interface IDeleteProps {
  openModal: boolean
  setOpenModal: Dispatch<any>
  confirmDelete: any
}
export interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export interface IModalProps extends IAssetsProps {
  refetch: any
  parentId: string
}
export interface ITabsProps extends IModalProps {
  handleClick: any
  submitNewFolder: any
  sameNameError: boolean
  folderName: string | null
  setFolderName: Dispatch<any>
}
export interface IAddFolderProps {
  handleClick: any
  submitNewFolder: any
  sameNameError: boolean
  folderName: string | null
  setFolderName: Dispatch<any>
}
