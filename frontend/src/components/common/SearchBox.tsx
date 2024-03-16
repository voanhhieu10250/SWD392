import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    navigate(('/search?query=' + data.get('query')) as string)
  }

  return (
    <form className='max-w-sm md:w-[400px] mx-auto' onSubmit={handleSubmit}>
      <label htmlFor='default-search' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
        Search
      </label>
      <div className='relative'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
          <SearchIcon />
        </div>
        <input
          type='search'
          id='default-search'
          name='query'
          className='block w-full p-2 ps-10 text-sm border border-input rounded-full bg-background shadow-inner'
          placeholder='Search Mockups, Logos...'
        />
      </div>
    </form>
  )
}

export default SearchBox
