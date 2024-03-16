import { Link } from 'react-router-dom'
import { Card, CardContent } from '../ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { cn } from '~/lib/utils'
import { Category, ResponseObj } from '~/types'
import { useQuery } from 'react-query'
import Spinner from '../common/Spinner'

const fetchCategories = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/category`)
  const data = (await res.json()) as ResponseObj<Category[]>
  return data.data
}

function CategoriesCarousel() {
  const { isFetching, isError, data } = useQuery<Category[], Error>('categories', fetchCategories)

  if (isError) {
    return <div>Failed to fetch categories</div>
  }

  if (isFetching) return <Spinner />
  if (!data || data.length === 0) return null

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
