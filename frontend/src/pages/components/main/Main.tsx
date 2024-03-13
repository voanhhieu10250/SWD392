import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import SwiperCore from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import CommentIcon from '@mui/icons-material/Comment'
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '~/components/ui/carousel'
SwiperCore.use([Pagination, Navigation])
type Post = {
  id: string
  name: string
  img: string
  like: number
  comment: number
}

type Category = {
  id: string
  category: string
  image: string
  like: number
  comment: number
}
const fetchCategories = async () => {
  const res = await axios.get('https://6335aa1fea0de5318a188910.mockapi.io/categories')
  return res.data
}
const fetchTopWeek = async () => {
  const res = await axios.get('https://6335aa1fea0de5318a188910.mockapi.io/categories')
  return res.data
}
const fetchPosts = async ({ pageParam = 1 }) => {
  const res = await axios.get(`https://6335aa1fea0de5318a188910.mockapi.io/post?page=${pageParam}`)

  return res.data
}

export default function Main() {
  // Categories API
  const { data: categoriesData, isFetching, isLoading: categoriesLoading } = useQuery('cate', fetchCategories)
  // Top this week API
  const { data: topweekData, isLoading: topweekLoading } = useQuery('topweek', fetchTopWeek)
  const [swiperLoaded, setSwiperLoaded] = useState(false)

  const [swiper2Loaded, setSwiper2Loaded] = useState(false)

  const [swiper3Loaded, setSwiper3Loaded] = useState(false)

  const {
    data: postData,
    isSuccess: postSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery('posts', fetchPosts, {
    getNextPageParam: (lastPage, pages) => {
      // Kiểm tra xem API có trả về dữ liệu cho trang tiếp theo hay không
      return lastPage.hasMore ? pages.length + 1 : undefined
    }
  })

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
        return
      }
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  useEffect(() => {
    if (!categoriesLoading && categoriesData && !swiperLoaded) {
      const swiper = new SwiperCore('.swiper-container', {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        slidesPerView: 9,
        spaceBetween: 10
      })
      setSwiperLoaded(true)
    }
  }, [categoriesLoading, categoriesData])

  useEffect(() => {
    if (!topweekLoading && topweekData && !swiper3Loaded) {
      const swiper3 = new SwiperCore('.swiper3', {
        loop: true,

        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        slidesPerView: 6,
        spaceBetween: 10
      })
      setSwiper3Loaded(true)
    }
  }, [topweekLoading, topweekData])
  useEffect(() => {
    if (postSuccess && postData && !swiper2Loaded) {
      const swiper2 = new SwiperCore('.swiper2', {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next2',
          prevEl: '.swiper-button-prev2'
        },
        pagination: {
          el: '.swiper-pagination2',
          clickable: true
        },
        slidesPerView: 6,
        spaceBetween: 10
      })

      setSwiper2Loaded(true)
    }
  }, [postSuccess, postData, swiper2Loaded])
  return (
    <div className='container mx-auto px-6 py-3'>
      <div className='body bg-slate-100'>
        {categoriesLoading ? (
          <div>Loading...</div>
        ) : (
          <div className='swiper-container swiper p-4'>
            <div className='swiper-wrapper '>
              {swiperLoaded &&
                categoriesData.map((category: Category) => (
                  <div key={category.id} className='swiper-slide relative'>
                    <img
                      src={category.image}
                      alt={category.category}
                      className='w-full h-24 object-cover rounded-2xl '
                      style={{ filter: 'brightness(80%)' }}
                    />
                    <div className='absolute bottom-0 left-0 rounded-2xl w-full h-full bg-custom-color opacity-100 transition-opacity flex justify-center items-end '>
                      <p className='text-white text-lg font-semibold w-full overflow-hidden whitespace-nowrap overflow-ellipsis px-3'>
                        {category.category}
                      </p>
                    </div>
                  </div>
                ))}
            </div>

            <div className='swiper-button-prev swiper-button bg-white rounded-2xl'></div>
            <div className='swiper-button-next swiper-button bg-white rounded-2xl'></div>
          </div>
        )}
        <div className='top_this_week bg-white m-3'>
          <div className='p-4 font-bold text-2xl'>Top This Week</div>
          <div className='swiper3 swiper3 p-4 overflow-hidden text-center'>
            <div className='swiper-wrapper bg-white '>
              {swiper3Loaded &&
                topweekData.map((top: Category) => (
                  <div className='swiper-slide' key={top.id}>
                    <div className='relative'>
                      <img
                        src={top.image}
                        className='w-full relative h-36 object-cover rounded-2xl hover:scale-105 transition-transform duration-300'
                      />
                      <div className='absolute bottom-0 left-0 rounded-2xl w-full h-full bg-custom-color bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex justify-center items-center flex-wrap'>
                        <p className='text-white text-lg font-semibold w-full overflow-hidden whitespace-nowrap overflow-ellipsis px-3'>
                          {top.category}
                        </p>
                        <div className='flex items-center text-white'>
                          <div className='mr-4'>
                            <ThumbUpIcon />
                            <span className='pl-1'>{top.like}</span>
                          </div>
                          <div>
                            <CommentIcon />
                            <span className='pl-1'>{top.comment}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className='browse bg-white m-3'>
          <div className='p-4 font-bold text-2xl'>Browse</div>
          <div className='columns-5 space-y-3'>
            {postSuccess && postData && postData.pages ? (
              postData.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {group.map((post: Post) => (
                    <div key={post.id} className='post relative'>
                      <img
                        src={post.img}
                        key={post.id}
                        alt=''
                        className=' h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300'
                      />
                      <div className='absolute bottom-0 left-0 rounded-2xl w-full h-full bg-custom-color bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex justify-center items-center flex-wrap'>
                        <p className='text-white text-lg font-semibold w-full overflow-hidden whitespace-nowrap overflow-ellipsis px-3'>
                          {post.name}
                        </p>
                        <div className='flex items-center text-white'>
                          <div className='mr-4'>
                            <ThumbUpIcon />
                            <span className='pl-1'>{post.like}</span>
                          </div>
                          <div>
                            <CommentIcon />
                            <span className='pl-1'>{post.comment}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))
            ) : (
              <div>No posts available</div>
            )}
            <div>{isFetchingNextPage && <div>Loading...</div>}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
