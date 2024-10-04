import { User } from 'next-auth'
import { AuthUser } from '.'

declare module 'next-auth' {
  interface Session {
    user: User
  }
}
