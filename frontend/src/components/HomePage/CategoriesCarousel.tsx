import { Link } from 'react-router-dom'
import { Card, CardContent } from '../ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { cn } from '~/lib/utils'
import { Category } from '~/types'
import { useQuery } from 'react-query'
import Spinner from '../common/Spinner'

function CategoriesCarousel() {
  const { isLoading, error, data } = useQuery<Category[], Error>('categories', () =>
    fetch('http://localhost:3000/categories.json').then((res) => res.json())
  )

  if (error) {
    return <div>Failed to fetch categories</div>
  }

  if (isLoading) return <Spinner />
  if (!data) return null

  return (
    <Carousel
      opts={{
        align: 'start',
        slidesToScroll: 5,
        duration: 15
      }}
      className='w-full'
    >
      <CarouselContent className='-ml-1.5'>
        {data.map((category, index) => (
          <CarouselItem key={index} className='basis-1/2 lg:basis-1/6 pl-1.5 max-w-[146px] first:ml-6 last:mr-6'>
            <Card>
              <Link to={'/search?show=' + encodeURI(category.name.toLowerCase())}>
                <CardContent
                  style={{
                    backgroundImage: `url(${category.image})`
                  }}
                  className='flex aspect-[7/5] items-center justify-center p-6 bg-cover relative'
                >
                  <div className='bg-black opacity-30 absolute inset-0'></div>
                  <span className='absolute bottom-1.5 left-3 font-semibold text-white text-sm'>{category.name}</span>
                </CardContent>
              </Link>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <div
        className={cn(
          'h-[100px] absolute w-10 right-0 top-0',
          'bg-[linear-gradient(270deg,hsl(var(--secondary))_8%,hsl(var(--secondary))_22%,transparent)]'
        )}
      ></div>
      <div
        className={cn(
          'h-[100px] absolute w-10 left-0 top-0',
          'bg-[linear-gradient(90deg,hsl(var(--secondary))_8%,hsl(var(--secondary))_22%,transparent)]'
        )}
      ></div>
    </Carousel>
  )
}

export default CategoriesCarousel
