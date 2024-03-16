import SearchIcon from '@mui/icons-material/Search'
import { useCallback } from 'react'
import { useMatch, useNavigate, useSearchParams } from 'react-router-dom'

const SearchBox = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const searchMatch = useMatch('/search')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    if (searchMatch) {
      setSearchParams(createQueryString('query', data.get('query') as string))
    } else {
      navigate(('/search?query=' + data.get('query')) as string)
    }
  }

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)

      return params.toString()
    },
    [searchParams]
  )

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
          defaultValue={searchParams.get('query') || ''}
          name='query'
          className='block w-full p-2 ps-10 text-sm border border-input rounded-full bg-background shadow-inner'
          placeholder='Search Mockups, Logos...'
        />
      </div>
    </form>
  )
}

export default SearchBox
