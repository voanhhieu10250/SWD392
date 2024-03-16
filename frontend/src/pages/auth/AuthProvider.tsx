import axios from 'axios'
import { ReactNode, createContext, useContext, useState } from 'react'

interface AuthContextType {
  isLoggedIn: boolean
  login: (username: string, password: string) => Promise<void>
}
const AuthContext = createContext<AuthContextType | null>(null)
interface AuthProviderProps {
  children: ReactNode
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const login = async (username: string, password: string) => {
    try {
      const res = await axios.post('', { username, password })
      if (res.status === 200) {
        setIsLoggedIn(true)
      }
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }
  return <AuthContext.Provider value={{ isLoggedIn, login }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
