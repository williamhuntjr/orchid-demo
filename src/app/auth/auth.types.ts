export interface IUserOwner {
  href: string
  id: number
}

export interface IUserScope {
  baseScope: string[]
  cameraScopes: string[]
}

export interface IUser {
  expiresIn: number
  href: string
  id: string
  name: string
  owner: IUserOwner
  role: string
  scope: IUserScope
  type: string
  loginTimestamp?: number
}
