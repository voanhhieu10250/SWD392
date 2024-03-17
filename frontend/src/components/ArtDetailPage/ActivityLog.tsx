import { Button } from '../ui/button'
import { DialogClose, DialogFooter, DialogHeader } from '../ui/dialog'
import {useEffect, useState} from "react";
import {Art, ResellTransaction, ResponseObj} from "~/types";
import {User} from "~/types/User.ts";
import {useParams} from "react-router";
import {format} from "date-fns";

type ArtDetail = Art & {
  owner?: User
}

const ActivityLog = () => {
  const [artHistory, setArtHistory] = useState<ResponseObj<ResellTransaction>>();
  const [artOwner, setArtOwner] = useState<ResponseObj<ArtDetail>>();

  const {artId} = useParams();

  useEffect(() => {
    const fetchArtHistory = async (id: string) => {
      const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/resell-transaction/art/${id}`);
      const data = (await res.json()) as ResponseObj<ResellTransaction>;
      setArtHistory(data);
    }

    const fetchOwner = async (id: string) => {
      const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/arts/${id}`)
      const data = (await res.json()) as ResponseObj<ArtDetail>;
      setArtOwner(data);
    }

    fetchArtHistory(artId || '0');
    fetchOwner(artId || '0');
  }, []);

  const formatDate = (date: Date): string => {
    return format(date, 'MMM d, yyyy');
  };

  console.log(artOwner);

  return (
    <>
      <DialogHeader className='mb-4 text-lg font-bold'>Activity Log</DialogHeader>

      {artHistory?.data.map((historyList, index) => (
        <div className='bg-secondary rounded-xl overflow-hidden p-3 mb-4' key={index}>
          <div className='flex items-center'>
            <div className='mr-4 flex items-center'>
              <img
                src='https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg'
                alt='Featured'
                className='w-16 h-16 rounded'
              />
            </div>
            <div className='flex-1'>
              <p className='font-bold'>{historyList.buyerUser.username}</p>
              <p className=''>{index === 0 ? "Current Owner" : "Previous Owner"}</p>
            </div>
            <div>
              <p className=''>Bought for ${historyList.transactionFee}</p>
              <p className='text-right'>{formatDate(historyList.date)}</p>
            </div>
          </div>
        </div>
      ))}

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
            <p className='font-bold'>{artOwner?.data.owner?.username}</p>
            <p className=''>Creator</p>
          </div>
          <div>
            <p className='font-bold'>Created</p>
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
