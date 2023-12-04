import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { IUser } from '@/interfaces/auth.interfaces'
import axiosInstance from '@/common/axios-utils'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req): Promise<any> {
        const username = credentials?.username
        // @ts-ignore
        const token = credentials?.token
        try {
          const { data: userData } = await axiosInstance.get<IUser>(`/users/${username}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          return { ...userData, token }
        } catch (e) {
          console.log('Error while auth: ', e)
          return Promise.reject(e)
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    async jwt({ user, token }) {
      if (user) token.user = { ...user }
      return token
    },
    async session({ session, token }) {
      if (token?.user) session.user = token.user
      return session
    }
  }
}
