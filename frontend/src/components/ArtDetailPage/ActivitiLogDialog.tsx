import { FaAngleRight } from 'react-icons/fa'
import { RiRepeatFill } from 'react-icons/ri'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import ActivityLog from './ActivityLog'
import {ResellTransaction, ResponseObj} from "~/types";
import {useQuery} from "react-query";
import {format} from 'date-fns';

const fetchCurrentOwner = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/resell-transaction/current-owner`)
  const data = (await res.json()) as ResponseObj<ResellTransaction>
  return data.data
}

const ActivitiLogDialog = () => {

  const {data} = useQuery<ResellTransaction | Error>('currentOwner',() => fetchCurrentOwner());
  console.log(data)

  const formatDate = (date: Date): string => {
    return format(date, 'MMM d, yyyy');
  };

  return (
    <Dialog>
      <DialogTrigger className='w-full'>
        <div className='bg-background rounded-xl overflow-hidden space-y-4 py-4 px-6 shadow-sm'>
          <div className='flex justify-center mb-2'>
            <span className='font-bold'>Activity Log</span>
          </div>
          {data && (
            <div className='flex justify-between'>
              <div className='inline-flex'>
                <div>
                  <img
                    src={data.avatar || 'https://miro.medium.com/v2/resize:fit:640/format:webp/1*W35QUSvGpcLuxPo3SRTH4w.png'}
                    alt='Avatar'
                    width={50}
                    className='rounded-lg'
                  />
                </div>
                <div className='ml-2 mr-4 text-left'>
                  <p className=''>Current Owner</p>
                  <p className='font-bold'>{data.buyerUser.username}</p>
                </div>
              </div>
              <div className='mr-1 ml-4 text-right'>
                <div>
                  <span className=''>Bought for ${data.transactionFee}</span>
                </div>
                <div>
                  <span className=''>{formatDate(data.date)}</span>
                </div>
              </div>
            </div>
          )}
          <div className='flex justify-center'>
            <div className='mt-2 hover:text-green-300 transition-all duration-200 flex items-center'>
              <span className='mr-1'>
                <RiRepeatFill/>
              </span>
              <span className='font-bold'>Traded 1 time</span>
              <span className='ml-1'>
                <FaAngleRight/>
              </span>
            </div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <ActivityLog/>
      </DialogContent>
    </Dialog>
  )
}

export default ActivitiLogDialog
