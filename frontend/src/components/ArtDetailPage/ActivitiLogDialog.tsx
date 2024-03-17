import { FaAngleRight } from 'react-icons/fa'
import { RiRepeatFill } from 'react-icons/ri'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import ActivityLog from './ActivityLog'

const ActivitiLogDialog = () => {
  return (
    <Dialog>
      <DialogTrigger className='w-full'>
        <div className='bg-background rounded-xl overflow-hidden space-y-4 py-4 px-6 shadow-sm'>
          <div className='flex justify-center mb-2'>
            <span className='font-bold'>Activity Log</span>
          </div>
          <div className='flex justify-between'>
            <div className='inline-flex'>
              <div>
                <img
                  src='https://i.pinimg.com/236x/db/c4/f7/dbc4f7f26f83a1cedc0aa9523550ff26.jpg'
                  alt='Avatar'
                  width={50}
                  className='rounded-lg'
                />
              </div>
              <div className='ml-2 mr-4 text-left'>
                <p className=''>Current Owner</p>
                <p className='font-bold'>LetMeKnow</p>
              </div>
            </div>
            <div className='mr-1 ml-4 text-right'>
              <div>
                <span className=''>Bought for $12</span>
              </div>
              <div>
                <span className=''>Jan 20, 2024</span>
              </div>
            </div>
          </div>
          <div className='flex justify-center'>
            <div className='mt-2 hover:text-green-300 transition-all duration-200 flex items-center'>
              <span className='mr-1'>
                <RiRepeatFill />
              </span>
              <span className='font-bold'>Traded 1 time</span>
              <span className='ml-1'>
                <FaAngleRight />
              </span>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <ActivityLog />
      </DialogContent>
    </Dialog>
  )
}

export default ActivitiLogDialog
