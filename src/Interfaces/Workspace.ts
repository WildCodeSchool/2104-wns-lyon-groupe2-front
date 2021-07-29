export interface iWorkspace {
  id?: string
  title?: string
  visio?: string
  feed: iFeed[]
  assets: iAssets[]
}

export interface iFeed {
  id?: string
  feedName?: string
  content?: string
  likes?: string[]
  dislikes?: string[]
  comments?: iComments[]
}

export interface iComments {
  id?: string
  content?: string
}

export interface iAssets {
  id?: string
  assetName?: string
  folders?: iFolders[]
}

// TODO: complete interface
export interface iFolders {
  id?: string
}
