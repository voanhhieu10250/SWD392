import axios from './axios'
import { jwtDecode } from 'jwt-decode'

// ----------------------------------------------------------------------

const isValidToken = (accessToken: string | null): boolean => {
  if (!accessToken) {
    return false
  }

  const decoded = jwtDecode(accessToken)

  if (!decoded.exp) {
    return false
  }

  const currentTime: number = Date.now() / 1000

  return decoded.exp > currentTime
}

// ----------------------------------------------------------------------

const setSession = (accessToken: string | null): void => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken)
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  } else {
    localStorage.removeItem('accessToken')
    delete axios.defaults.headers.common.Authorization
  }
}

export { isValidToken, setSession }
