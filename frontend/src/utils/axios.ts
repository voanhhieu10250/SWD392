import axios from 'axios'
// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT as string
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
)

export default axiosInstance
