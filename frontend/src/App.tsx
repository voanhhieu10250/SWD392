import { AuthProvider } from './pages/auth/AuthProvider'
import Router from './routers'

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  )
}
export default App
