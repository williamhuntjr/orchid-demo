export interface IResponseStatus {
  code: string
  message: string
}

export interface IResponse<TData, TStatus = IResponseStatus> {
  data: TData
  status: TStatus
}
