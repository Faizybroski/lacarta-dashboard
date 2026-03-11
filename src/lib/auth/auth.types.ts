export type UserRole =
  | 'owner'
  | 'admin'
  | 'assistant'
  | 'editor'
  | 'client'
  | 'subscriber'

export interface AuthUser {
  accountNo: string
  email: string
  name: string
  role: UserRole[]
  exp: number
}

export interface AuthSession {
  user: AuthUser
  accessToken: string
}