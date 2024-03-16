import { useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import { useInView } from 'react-intersection-observer'
import Masonry from 'react-masonry-css'
import { Art, PageResponse, ResponseObj } from '~/types'
import { Link, useSearchParams } from 'react-router-dom'
import Spinner from '../common/Spinner'

const fetchRecentArts = async (pageParam: number, query = '', searchBy = '') => {
  const res = await fetch(
    `${import.meta.env.VITE_API_ENDPOINT}/arts/search?query=${query}&searchBy=${searchBy}&page=${pageParam}`
  )
  const data = (await res.json()) as ResponseObj<PageResponse<Art>>
  return data.data
}

const SearchResults = () => {
  const [searchParams] = useSearchParams()
  const { data, error, isError, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, refetch } =
    useInfiniteQuery<PageResponse<Art>, Error>(
      ['search', searchParams.get('searchBy')],
      async ({ pageParam = 1 }) =>
        await fetchRecentArts(pageParam, searchParams.get('query') || '', searchParams.get('searchBy') || ''),
      {
        getNextPageParam: (lastPage) => (lastPage.last ? null : lastPage.number + 2) // number + 2 because BE is 1-based index
      }
    )

  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView && !isFetching && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView, isFetchingNextPage, hasNextPage, isFetching])

  useEffect(() => {
    refetch()
  }, [searchParams, refetch])

  if (isFetching) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>{error.message}</div>
  }
  if (!data) return null

  const arts = data.pages.flatMap((page) => page.content)

  return (
    <div>
      <Masonry breakpointCols={3} className='flex w-full gap-x-3' columnClassName='my-masonry-grid_column'>
        {arts.map((art, index) => (
          <Link className='block w-full relative rounded-lg overflow-hidden mb-3' key={index} to={`/art/${art.id}`}>
            <img src={art.originUrl} alt='' className='w-full h-auto' />
            <div className='bg-gradient-to-t from-black/40 to-transparent absolute inset-0 opacity-0 hover:opacity-100 transition-opacity'>
              <span className='absolute bottom-0 left-0 pb-1.5 px-3 w-full font-semibold text-white text-sm truncate'>
                {art.title}
              </span>
            </div>
          </Link>
        ))}
      </Masonry>
      {!hasNextPage && <div className='text-center text-gray-500'>No more arts</div>}
      <div ref={ref}>{isFetchingNextPage && <Spinner />}</div>
    </div>
  )
}

export default SearchResults
