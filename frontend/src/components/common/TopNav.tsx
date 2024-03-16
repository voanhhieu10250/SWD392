import { ModeToggle } from './ModeToggle'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'

const TopNav = () => {
  // let session = await getSession();
  // console.log(session);

  return (
    <div className='sticky top-0 flex justify-between px-[calc(1%+10px)] py-4 shadow-md bg-background z-50'>
      <div className='grid place-content-center'>
        <Link to='/' className='text-2xl font-semibold tracking-tight'>
          Artwork
        </Link>
      </div>
      <div className='grid place-content-center'>
        <SearchBox />
      </div>
      <div className='flex items-center gap-x-2'>
        {/* {session ? (
          <>
            <OptionsDropdown username={session.user.username} />
            <UploadDialog />
          </>
        ) : (
          <LoginDialog />
        )} */}
        <ModeToggle />
      </div>
    </div>
  )
}

export default TopNav
