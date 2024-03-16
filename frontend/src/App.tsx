import { Outlet } from 'react-router'
import { ThemeProvider } from './components/theme-provider'
import TopNav from './components/common/TopNav'
import MainLayout from './layouts/MainLayout'
import { AuthProvider } from './context/JWTContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <AuthProvider>
      <div className='min-h-screen bg-background font-sans antialiased'>
        <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
          <div className='bg-secondary flex flex-col min-h-screen'>
            <TopNav />

            <MainLayout>
              <Outlet />
            </MainLayout>
          </div>
          <ToastContainer
            position='top-right'
            autoClose={2000}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={true}
            theme='colored'
          />
        </ThemeProvider>
      </div>
    </AuthProvider>
  )
}

export default App
