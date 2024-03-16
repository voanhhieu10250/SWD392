import { useSearchParams } from 'react-router-dom'

const Search = () => {
  const [searchParams] = useSearchParams()

  return (
    <div className='mt-5 relative flex justify-center items-start gap-6'>
      <div className='flex-1 space-y-5'>
        <div className='bg-background rounded-xl shadow-sm px-4 py-5 text-sm font-semibold'>
          Showing results for &quot;{searchParams.get('query')}&quot;
        </div>
        <SearchResults query={searchQuery} show={searchParams.show} />
      </div>
      <div className='sticky top-0 h-full w-72 hidden md:block'>
        <div className='bg-background rounded-xl shadow-sm py-5 text-sm'>
          <Filter defaultValue='artwork' />
        </div>
      </div>
    </div>
  )
}

export default Search
