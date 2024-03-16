import { Outlet } from 'react-router'
import { ThemeProvider } from './components/theme-provider'
import { Toaster } from './components/ui/toaster'
import TopNav from './components/common/TopNav'
import MainLayout from './layouts/MainLayout'

// function App() {
//   return (
//     <AuthProvider>
//       <Router />
//     </AuthProvider>
//   )
// }

function App() {
  return (
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
  )
}

export default App
