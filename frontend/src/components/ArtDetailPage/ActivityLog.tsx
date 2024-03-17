import { Button } from '../ui/button'
import { DialogClose, DialogFooter, DialogHeader } from '../ui/dialog'

const ActivityLog = () => {
  return (
    <>
      <DialogHeader className='mb-4 text-lg font-bold'>Activity Log</DialogHeader>

      <div className='bg-secondary rounded-xl overflow-hidden p-3 mb-4'>
        <div className='flex items-center'>
          <div className='mr-4 flex items-center'>
            <img
              src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'
              alt='Featured'
              className='w-16 h-16 rounded'
            />
          </div>
          <div className='flex-1'>
            <p className='font-bold'>PragmaticWisdom</p>
            <p className=''>Current Owner</p>
          </div>
          <div>
            <p className=''>Bought for $12</p>
            <p className='text-right'>Jan 10, 2024</p>
          </div>
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type='button' variant='secondary'>
            Got it
          </Button>
        </DialogClose>
      </DialogFooter>
    </>
  )
}

export default ActivityLog
