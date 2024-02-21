import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import SwiperCore from 'swiper'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/swiper-bundle.css'

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
}
const fetchCategories = async () => {
  const res = await axios.get('https://6335aa1fea0de5318a188910.mockapi.io/categories')
  return res.data
}
const fetchPosts = async ({ pageParam = 1 }) => {
  const res = await axios.get(`https://6335aa1fea0de5318a188910.mockapi.io/post?page=${pageParam}`)

  return res.data
}

export default function Main() {
  const { data: categoriesData, isFetching, isLoading: categoriesLoading } = useQuery('posts', fetchCategories)
  const [swiperLoaded, setSwiperLoaded] = useState(false)

  const [swiper2Loaded, setSwiper2Loaded] = useState(false)
  const {
    data: postData,
    isSuccess: postSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery('posts', fetchPosts, {
    getNextPageParam: (lastPage, pages) => {
      // Kiểm tra xem API có trả về dữ liệu cho trang tiếp theo hay không
      return lastPage.length ? pages.length + 1 : undefined
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
                  <div key={category.id} className='swiper-slide'>
                    <img
                      src={category.image}
                      alt={category.category}
                      className='w-full h-24 object-cover rounded-2xl'
                    />
                  </div>
                ))}
            </div>
            <div className='swiper-pagination'></div>
            <div className='swiper-button-prev'></div>
            <div className='swiper-button-next'></div>
          </div>
        )}
        <div className='top_this_week bg-white m-3'>
          <div>Top This Week</div>
          <div className='swiper-container swiper2 p-4 overflow-hidden text-center'>
            <div className='swiper-wrapper bg-white '>
              <div className='swiper-slide'>
                <img src='/logo.png' alt='Image 1' className='w-full' />
              </div>
              <div className='swiper-slide'>
                <img src='/logo.png' alt='Image 2' className='w-full' />
              </div>
              <div className='swiper-slide'>
                <img src='/logo.png' alt='Image 3' className='w-full' />
              </div>
              <div className='swiper-slide'>
                <img src='/logo.png' alt='Image 4' className='w-full' />
              </div>
              <div className='swiper-slide'>
                <img src='/logo.png' alt='Image 5' className='w-full' />
              </div>
              <div className='swiper-slide'>
                <img src='/logo.png' alt='Image 6' className='w-full' />
              </div>
              <div className='swiper-slide'>
                <img src='/logo.png' alt='Image 7' className='w-full' />
              </div>
            </div>
            <div className='swiper-pagination2'></div>
          </div>
        </div>
        <div className='browse bg-white m-3'>
          <div>Browse</div>
          <div className='grid grid-cols-6 gap-4'>
            {postSuccess && postData && postData.pages ? (
              postData.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {group.map((post: Post) => (
                    <div key={post.id} className='post'>
                      <img src={post.img} key={post.id} alt='' />
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
