import { createContext, useEffect, useReducer } from 'react'
import axios from '../utils/axios'
import { isValidToken, setSession } from '../utils/jwt'
import { User } from '~/types/User'
import { toast } from 'react-toastify'
import { ResponseObj } from '~/types'

// Define types for state and action
type State = {
  isAuthenticated: boolean
  isInitialized: boolean
  user: User | null // Adjust the type according to your user object structure
}

type Action =
  | { type: 'INITIALIZE'; payload: { isAuthenticated: boolean; user: User | null } }
  | { type: 'LOGIN'; payload: { user: User } }
  | { type: 'LOGOUT' }
  | { type: 'REGISTER'; payload: { user: User } }

// Define initial state
const initialState: State = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
}

// Define reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INITIALIZE':
      return {
        ...state,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
        user: action.payload.user
      }
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        isInitialized: true,
        user: action.payload.user
      }
    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        isInitialized: true,
        user: action.payload.user
      }
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    default:
      return state
  }
}

// Create AuthContext with proper types
const AuthContext = createContext<{
  isAuthenticated: boolean
  isInitialized: boolean
  user: User | null
  method: string
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (email: string, password: string, username: string) => Promise<void>
  reAuthenticate: () => Promise<void>
}>({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
  reAuthenticate: () => Promise.resolve()
})

// Define AuthProvider component with TypeScript types
function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken')

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken)

          const response = await axios.get<ResponseObj<User>>('/users/my-account')
          const user = response.data.data

          toast.success('Authenticated successfully.')

          console.log('user', user)

          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user
            }
          })
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null
            }
          })
        }
      } catch (err) {
        console.error(err)
        toast.error('Failed to authenticate.')
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null
          }
        })
      }
    }

    initialize()
  }, [])

  const reAuthenticate = async () => {
    try {
      const response = await axios.get<ResponseObj<User>>('/users/my-account')
      const user = response.data.data

      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: true,
          user
        }
      })
    } catch (err) {
      console.error(err)
      toast.error('Failed to re-authenticate.')
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: false,
          user: null
        }
      })
    }
  }

  const login = async (email: string, password: string) => {
    const response = await axios.post('/login', {
      email,
      password
    })
    const { accessToken, user } = response.data.data

    toast.success('Logged in successfully.')
    setSession(accessToken)
    dispatch({
      type: 'LOGIN',
      payload: {
        user
      }
    })
  }

  const register = async (email: string, password: string, username: string) => {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    formData.append('username', username)

    const response = await axios.post('/users/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    const { accessToken, user } = response.data.data

    toast.success('Registered successfully.')
    window.localStorage.setItem('accessToken', accessToken)
    dispatch({
      type: 'REGISTER',
      payload: {
        user
      }
    })
  }

  const logout = async () => {
    toast.success('Logged out successfully.')
    setSession(null)
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        reAuthenticate
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
