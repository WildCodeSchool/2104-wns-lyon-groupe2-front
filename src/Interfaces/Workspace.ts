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
  messages: IMessage[]
}

export interface IMessage {
  id?: string
  content?: string
  userId?: string
  createdAt?: Date
  likes?: ILike[]
  dislikes?: IDislike[]
  comments?: IComment[]
}

export interface IComment {
  id?: string
  content?: string
  userId?: string
  createdAt?: Date
}

export interface ILike {
  userId?: string
}

export interface IDislike {
  userId?: string
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
