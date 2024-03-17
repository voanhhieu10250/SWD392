import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { Art, ResponseObj } from '~/types'
import Spinner from '../common/Spinner'
import { Carousel, CarouselContentWithScrollbar, CarouselItem } from '../ui/carousel'

const fetchTopArtWeek = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/arts/top-week`)
  const data = (await res.json()) as ResponseObj<Art[]>
  return data.data
}

const TrendingArts = () => {
  const { isError, data, isFetching } = useQuery<Art[], Error>('top-art-week', fetchTopArtWeek)

  if (isError) {
    return <div>Failed to fetch arts</div>
  }
  if (isFetching) return <Spinner />
  if (!data || data.length === 0) return <div className='text-center text-gray-500'>No arts found</div>

  return (
    <Carousel
      opts={{
        align: 'start',
        dragFree: true
      }}
      className='w-full'
    >
      <CarouselContentWithScrollbar className='-ml-1.5'>
        {data.map((art, index) => (
          <CarouselItem key={index} className='pl-1.5 basis-auto'>
            <Link
              to={'/art/' + art.id}
              className='flex w-fit h-40 items-center justify-center p-0 bg-cover relative rounded-lg overflow-hidden'
            >
              <img src={art.originUrl} alt='' className='w-auto h-40' />
              <div className='bg-gradient-to-t from-black/40 to-transparent absolute inset-0 opacity-0 hover:opacity-100 transition-opacity'>
                <span className='absolute bottom-0 left-0 pb-1.5 px-3 w-full font-semibold text-white text-sm truncate'>
                  {art.title}
                </span>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContentWithScrollbar>
    </Carousel>
  )
}

export default TrendingArts
