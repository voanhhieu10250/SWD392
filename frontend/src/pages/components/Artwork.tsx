import { Route, Routes } from 'react-router'
import Header from './header'
import Main from './main'
import Search from './search/Search'
import ProfileUser from './profile'

export default function ArtWork() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/search' element={<Search />} />
        <Route path='/profile/:userId' element={<ProfileUser />} />
      </Routes>
    </div>
  )
}
