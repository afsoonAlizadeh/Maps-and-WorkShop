export interface ApiSingleResponse<T = any> {
  code: number
  message: string
  errors: string | null
  value: T
}

export interface ApiResponse<T = any> {
  code: number
  message: string
  errors: string | null
  value: DataResponse<T>
}

export interface DataResponse<T> {
  [key: string]: T[] & { total: number }
}
