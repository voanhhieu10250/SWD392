import { useSearchParams } from 'react-router-dom'
import Filter from '~/components/SearchPage/Filter'
import SearchResults from '~/components/SearchPage/SearchResults'

const Search = () => {
  const [searchParams] = useSearchParams()

  return (
    <div className='mt-5 relative flex justify-center items-start gap-6'>
      <div className='flex-1 space-y-5'>
        <div className='bg-background rounded-xl shadow-sm px-4 py-5 text-sm font-semibold'>
          Showing results for &quot;{searchParams.get('query')}&quot;
        </div>
        <SearchResults />
      </div>
      <div className='sticky top-0 h-full w-72 hidden md:block'>
        <div className='bg-background rounded-xl shadow-sm py-5 text-sm'>
          <Filter />
        </div>
      </div>
    </div>
  )
}

export default Search
