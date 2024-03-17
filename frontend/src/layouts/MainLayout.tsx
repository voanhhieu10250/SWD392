import { useMatch } from 'react-router'
import SideNav from '~/components/common/SideNav'
import { cn } from '~/lib/utils'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const artMatch = useMatch('/art/:artId')
  const profileMatch = useMatch('/profile/:userId')
  const loginMatch = useMatch('/login')
  const registerMatch = useMatch('/register')

  return (
    <>
      {/* Side nav */}
      {!artMatch && !profileMatch && (
        <div className='w-[75px] fixed top-0 left-0'>
          <SideNav />
        </div>
      )}

      {/* main */}
      <div className={cn(!artMatch && !profileMatch && 'ml-[75px]', 'flex-1')}>
        <main className={cn({ 'container mx-auto': !loginMatch && !registerMatch }, !!artMatch && 'max-w-6xl')}>
          {children}
        </main>
      </div>
      {(artMatch || profileMatch) && (
        <div className='flex justify-center items-center h-16 bg-background'>
          <p className='text-muted-foreground text-sm'>© 2024 ArtWork. All Rights Reserved.</p>
        </div>
      )}
    </>
  )
}

export default MainLayout
