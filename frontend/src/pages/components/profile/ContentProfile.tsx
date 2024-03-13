import { Box, Button, Modal, Tab, Tabs, Typography } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import CommentIcon from '@mui/icons-material/Comment'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}
enum Type {
  All = 'all',
  Physical = 'Physical',
  Digital = 'Digital'
}
interface Post {
  id: string
  name: string
  img: string
  like: number
  comment: number
  type: string
}
const fetchPosts = async ({ pageParam = 1 }) => {
  const res = await axios.get(`https://6335aa1fea0de5318a188910.mockapi.io/post?page=${pageParam}`)

  return res.data
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}
function DataComponent({ type }: { type: Type }) {
  const {
    data: postData,
    isSuccess: postSuccess,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery('posts', fetchPosts, {
    getNextPageParam: (lastPage, pages) => {
      return lastPage.hasMore ? pages.length + 1 : undefined
    }
  })
  const filteredData =
    type === 'all' ? postData?.pages : postData?.pages.map((page) => page.filter((item: Post) => item.type === type))

  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
        return
      }
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }

      if (!isFetchingNextPage) {
        fetchNextPage()
        setHeight((prevHeight) => prevHeight + 10) // Thay 10 bằng số lượng rem bạn muốn thêm vào mỗi lần cuộn
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  return (
    <div className='columns-3 box-border -m-1 space-y-3 '>
      {postSuccess && filteredData ? (
        filteredData.map((group, i) => (
          <React.Fragment key={i}>
            {group.map((post: Post) => (
              <div key={post.id} className='post relative h-fit'>
                <img
                  src={post.img}
                  key={post.id}
                  alt=''
                  className=' h-auto object-cover rounded-2xl hover:scale-105 transition-transform duration-300'
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
  )
}
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 612,
  maxWidth: 712,
  height: 712,
  dislay: 'flex',
  justifyContent: 'center',
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,

  pb: 3
}
export default function ContentProfile() {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  const [open, setOpen] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)
  const handleOpen2 = () => {
    setOpen2(true)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }
  const handleClose2 = () => {
    setOpen2(false)
  }
  const [openFavou, setOpenFavou] = React.useState(false)
  const handleOpenFavou = () => {
    setOpenFavou(true)
  }
  const handleCloseFavou = () => {
    setOpenFavou(false)
  }

  const { data: favouCollect, isLoading: favouCollectLoading } = useQuery('favouCollect', fetchPosts)
  return (
    <div className='flex '>
      <div className='w-1/3'>
        <div className='mt-5 bg-white '>
          <p className='p-3 text-2xl font-medium'>Collections Favourite</p>
          <div className='pl-5 pb-4 text-center'>
            <div className='flex flex-wrap '>
              {favouCollect?.slice(0, 4).map((post: Post) => (
                <div className='collection-item-img w-52 h-48 p-2 relative'>
                  <img
                    src={post.img}
                    alt=''
                    className='w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute bottom-0 left-0    rounded-2xl w-full h-full bg-custom-color bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex justify-center items-center flex-wrap'>
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
            </div>

            <a className='text-black cursor-pointer hover:text-purple-400' onClick={handleOpenFavou}>
              See more
            </a>
            <Modal
              open={openFavou}
              onClose={handleCloseFavou}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <Box sx={style}>
                <Typography id='modal-modal-title' className=' modal-header '>
                  <h1 className=' font-bold text-2xl text-black'> Favourite Post</h1>
                </Typography>
                <Typography id='modal-modal-description' className='' sx={{ mx: 2 }}>
                  {favouCollect?.map((post: Post) => (
                    <div className='grid grid-cols-1 mb-2'>
                      <div
                        className='rounded-2xl '
                        style={{
                          backgroundImage: `linear-gradient(rgba(88, 86, 86, 0.5), rgba(45, 42, 42, 0.5)),url(${post.img})`
                        }}
                      >
                        <div className='flex flex-wrap text-white  py-4 px-3 '>
                          <div className='p-3 w-1/6'>
                            <Avatar className='w-16 h-16'>
                              <AvatarImage
                                src='https://photo.znews.vn/w660/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg'
                                className='object-cover'
                              />
                            </Avatar>
                          </div>
                          <div className='p-3 w-3/6  whitespace-nowrap  '>
                            <div className='text-xl font-bold w-full overflow-hidden text-ellipsis'>{post.name}</div>

                            <div className='w-full overflow-hidden text-ellipsis '>
                              Title PosTitle PosTitle PosTitle PosTitle PosTitle PosTitle PosTitle PosTitle Post
                            </div>
                          </div>
                          <div className='flex items-center text-white w-2/6'>
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
                    </div>
                  ))}
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
        <div className='mt-5 bg-white pb-5'>
          <p className='p-3 text-2xl font-medium '>Followers</p>
          <div className='flex flex-wrap avatar-container'>
            <div className='pl-5 py-3'>
              <Avatar className='w-16 h-16'>
                <AvatarImage
                  src='https://photo.znews.vn/w660/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg'
                  className='object-cover'
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className='px-10 text-center   bg-slate-300 mx-10 rounded-xl '>
            <Button className='text-white' onClick={handleOpen}>
              View all Followers
            </Button>
          </div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Typography
                id='modal-modal-title'
                className='py-3 font-bold sticky top-0 left-0 right-0 h-20 bg-white bg-opacity-95  flex items-center   pl-4 z-50'
              >
                <h1 className='font-bold text-2xl text-black'> FOLLOWERS</h1>
              </Typography>
              <Typography id='modal-modal-description' sx={{ mx: 2 }}>
                <div className='grid grid-cols-1 mb-2'>
                  <div
                    className='rounded-2xl '
                    style={{
                      backgroundImage: "url('https://fps.cdnpk.net/home/cover/image-7.jpg?w=1400')"
                    }}
                  >
                    <div className='flex flex-wrap text-white  py-2 px-3'>
                      <div className='p-3'>
                        <Avatar className='w-16 h-16'>
                          <AvatarImage
                            src='https://photo.znews.vn/w660/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg'
                            className='object-cover'
                          />
                        </Avatar>
                      </div>
                      <div className='p-3'>
                        <div className='text-xl font-bold'>Title</div>
                        <p>Description</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
        <div className='mt-5 bg-white pb-5'>
          <p className='p-3 text-2xl font-medium'>Following</p>
          <div className='flex flex-wrap avatar-container'>
            <div className='p-3'>
              <Avatar className='w-16 h-16'>
                <AvatarImage
                  src='https://photo.znews.vn/w660/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg'
                  className='object-cover'
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className='px-10 text-center bg-slate-300 mx-10 rounded-xl '>
            <Button className='text-white' onClick={handleOpen2}>
              View all Following
            </Button>
          </div>
          <Modal
            open={open2}
            onClose={handleClose2}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Typography
                id='modal-modal-title'
                className='py-3 font-bold sticky top-0 left-0 right-0 h-20 bg-white bg-opacity-95  flex items-center   pl-4 z-50'
              >
                <h1 className='font-bold text-2xl text-black'> FOLLOWING</h1>
              </Typography>
              <Typography id='modal-modal-description' sx={{ mx: 2 }}>
                <div className='grid grid-cols-1 mb-2'>
                  <div
                    className='rounded-2xl '
                    style={{
                      backgroundImage: "url('https://fps.cdnpk.net/home/cover/image-7.jpg?w=1400')"
                    }}
                  >
                    <div className='flex flex-wrap text-white  py-2 px-3'>
                      <div className='p-3'>
                        <Avatar className='w-16 h-16'>
                          <AvatarImage
                            src='https://photo.znews.vn/w660/Uploaded/qhj_yvobvhfwbv/2018_07_18/Nguyen_Huy_Binh1.jpg'
                            className='object-cover'
                          />
                        </Avatar>
                      </div>
                      <div className='p-3'>
                        <div className='text-xl font-bold'>Title</div>
                        <p>Description</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
      <div className='w-2/3'>
        <div className='mt-5 bg-white ml-5 '>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label='basic tabs example'>
              <Tab label='All' {...a11yProps(0)} />
              <Tab label='Physical' {...a11yProps(1)} />
              <Tab label='Digital' {...a11yProps(2)} />
            </Tabs>
            <CustomTabPanel value={value} index={0}>
              <DataComponent type={Type.All} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <DataComponent type={Type.Physical} />`
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <DataComponent type={Type.Digital} />
            </CustomTabPanel>
          </Box>
        </div>
      </div>
    </div>
  )
}
