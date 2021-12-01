import { ApolloQueryResult } from '@apollo/client'
import React, { Dispatch, SetStateAction } from 'react'

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

export interface IFolderDetails {
  name: string
  createdAt: string
}

export interface IGridProps {
  assetsList: IAssetsDetails[]
  updateComponent: boolean
  setUpdateComponent: Dispatch<React.SetStateAction<boolean>>
}
export interface IDeleteProps {
  openModal: boolean
  setOpenModal: Dispatch<React.SetStateAction<boolean>>
  confirmDelete: any
}
export interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

export interface IAssetsProps {
  folderId: string
  setUpdateComponent: Dispatch<React.SetStateAction<boolean>>
  updateComponent: boolean
  isModalOpen: boolean
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>
}
export interface IModalProps {
  refetch: any
  parentId: string
  setUpdateComponent: Dispatch<React.SetStateAction<boolean>>
  updateComponent: boolean
}
export interface ITabsProps {
  handleClick: any
  submitNewFolder: any

  sameNameError: boolean
  folderName: string | null
  setFolderName: Dispatch<React.SetStateAction<string | null>>
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>
  isModalOpen: boolean
  refetch: Promise<ApolloQueryResult<any>>
  parentId: string
  folderId: string
  setUpdateComponent: Dispatch<React.SetStateAction<boolean>>
  updateComponent: boolean
}
export interface IAddFolderProps {
  handleClick: any
  submitNewFolder: any
  sameNameError: boolean
  folderName: string | null
  setFolderName: Dispatch<React.SetStateAction<string | null>>
  setIsModalOpen: Dispatch<React.SetStateAction<boolean>>
  isModalOpen: boolean
}

export interface ITags {
  label: string
}
export interface ITagsProps {
  allTags: ITags[]
  tagsSelected?: ITags[]
  setTagsSelected: Dispatch<React.SetStateAction<Array<ITags>>>
}
