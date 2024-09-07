export interface WorkShop {
  id: number
  user_id: number
  identity_id?: any
  company_id: number
  company_type: string
  location_id: number
  phone_number: string
  contact: string
  postal_code?: any
  latitude: number
  longitude: number
  created_at: number
  updated_at: number
  is_deleted: boolean
}

export interface InformationCompony {
  id: number
  user_id: number
  identity_id?: any
  company_id: number
  company_type: string
  location_id: number
  phone_number: string
  contact: string
  postal_code?: any
  latitude: number
  longitude: number
  created_at: number
  updated_at: number
  is_deleted: boolean
  companyName: string
  companyActivity: string
}
