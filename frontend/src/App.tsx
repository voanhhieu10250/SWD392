import { Outlet } from 'react-router'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'
import TopNav from './components/common/TopNav'
import MainLayout from './layouts/MainLayout'
import { AuthProvider } from './context/JWTContext'

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
          <Toaster />
        </ThemeProvider>
      </div>
    </AuthProvider>
  )
}

export default App
