export interface Location {
  id: number
  parent_id: number
  type: string
  name: string
  latitude: number
  longitude: number
  created_at: number
  updated_at?: any
  is_deleted: boolean
}
