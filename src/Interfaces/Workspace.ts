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
  userName?: string
  color?: string
  createdAt?: string
  likes?: ILike[]
  dislikes?: IDislike[]
  comments?: IComment[]
}

export interface IComment {
  id?: string
  content?: string
  userId?: string
  userName?: string
  color: string
  createdAt?: string
}

export interface ILike {
  userId?: string
  userName?: string
}

export interface IDislike {
  userId?: string
  userName?: string
}

export interface iAssets {
  id?: string
  name?: string
  folders?: iFolders[]
}

// TODO: complete interface
export interface iFolders {
  id?: string
}
