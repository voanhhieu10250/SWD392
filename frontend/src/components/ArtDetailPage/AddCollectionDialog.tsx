import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { FolderPlus } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { IoIosAdd } from 'react-icons/io'

const AddCollectionDialog = ({ artId }: { artId: number | string }) => {
  // const { user } = useAuth()

  return (
    <Dialog>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger>
              <div className='p-1'>
                <FolderPlus />
              </div>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side='top'>
            <p>Add to collection</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader className='mb-4 text-lg font-bold'>Add to Collection</DialogHeader>
        <div className='flex items-center mb-4'>
          <div className='mr-4 flex items-center'>
            <input type='checkbox' className='mr-2 checkbox' />
            <img
              src='https://cdn.popsww.com/blog/sites/2/2022/12/top-anime-nam-dep.jpg'
              alt='Featured'
              className='w-16 h-16 rounded'
            />
          </div>
          <div>
            <p className=''>Featured</p>
            <p className=''>1 deviation</p>
          </div>
        </div>
        <DialogFooter>
          <button className='mr-2 px-4 py-2  flex items-center hover:text-green-500'>
            <span className='mr-1 text-xl'>
              <IoIosAdd />
            </span>
            <span className='font-bold'>New Collection</span>
          </button>
          <Button>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddCollectionDialog
