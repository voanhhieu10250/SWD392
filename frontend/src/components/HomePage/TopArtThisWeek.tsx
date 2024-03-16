import { Link } from 'react-router-dom'
import { Carousel, CarouselContentWithScrollbar, CarouselItem } from '../ui/carousel'
import { useQuery } from 'react-query'
import { Art } from '~/types'
import Spinner from '../common/Spinner'

const TopArtThisWeek = () => {
  const { isLoading, error, data } = useQuery<Art[], Error>('top-art-week', () =>
    fetch('https://5f5c7a455e3a4d0016249458.mockapi.io/api/arts').then((res) => res.json())
  )

  if (error) {
    return <div>Failed to fetch arts</div>
  }
  if (isLoading) return <Spinner />
  if (!data) return null

  return (
    <div>
      <h3 className='scroll-m-20 mt-4 mb-6 pl-2.5 text-xl font-semibold tracking-tight'>Top This Week</h3>
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
    </div>
  )
}

export default TopArtThisWeek
