'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

type NextAuthSessionProviderProps = {
  children: ReactNode
}

export default function NextAuthSessionProvider({
  children,
}: NextAuthSessionProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}
