export interface ICameraStream {
  id: number
  href: string
}

export interface ICamera {
  id: number
  name: string
  primaryStream: ICameraStream
}

export interface ICameraList {
  cameras: ICamera[]
}