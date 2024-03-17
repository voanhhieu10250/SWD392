import { useEffect } from 'react'
import { useInfiniteQuery } from 'react-query'
import { useInView } from 'react-intersection-observer'
import Masonry from 'react-masonry-css'
import { Art, PageResponse, ResponseObj } from '~/types'
import { Link } from 'react-router-dom'
import Spinner from '../common/Spinner'

// max-width: columns
const breakpointColumnsObj = {
  default: 5,
  1024: 3,
  768: 2
}

const fetchRecentArts = async ({ pageParam = 1 }) => {
  const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/arts/recent?page=${pageParam}`)
  const data = (await res.json()) as ResponseObj<PageResponse<Art>>
  return data.data
}

const RecentArts = () => {
  const { data, error, isError, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery<
    PageResponse<Art>,
    Error
  >('recent-arts', fetchRecentArts, {
    getNextPageParam: (lastPage) => (lastPage.last ? null : lastPage.number + 2) // number + 2 because BE is 1-based index
  })

  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView && !isFetching && !isFetchingNextPage && hasNextPage) {
      fetchNextPage()
    }
  }, [fetchNextPage, inView, isFetchingNextPage, hasNextPage, isFetching])

  if (isFetching) {
    return <div>Loading...</div>
  }
  if (isError) {
    return <div>{error.message}</div>
  }
  if (!data) return null

  const arts = data.pages.flatMap((page) => page.content)

  return (
    <>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className='flex w-full gap-x-3'
        columnClassName='my-masonry-grid_column'
      >
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
    </>
  )
}

export default RecentArts
