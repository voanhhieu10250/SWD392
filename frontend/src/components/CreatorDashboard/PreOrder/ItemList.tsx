import { formatDistanceToNow } from 'date-fns/formatDistanceToNow'
import { ScrollArea } from '~/components/ui/scroll-area'
import { cn } from '~/lib/utils'
import { NavLink } from 'react-router-dom'

const ItemList = () => {
  const items = [
    {
      id: 1,
      name: 'John Doe',
      date: '2022-09-01T00:00:00',
      subject: 'New message',
      text: 'Hello, I would like to preorder your new art piece. I am interested in the digital version. Can you please provide me with more information?'
    },
    {
      id: 2,
      name: 'Jane Doe',
      date: '2022-09-01T00:00:00',
      subject: 'New message',
      text: 'Hello, I would like to preorder your new art piece. I am interested in the digital version. Can you please provide me with more information?'
    },
    {
      id: 3,
      name: 'John Doe',
      date: '2022-09-01T00:00:00',
      subject: 'New message',
      text: 'Hello, I would like to preorder your new art piece. I am interested in the digital version. Can you please provide me with more information?'
    },
    {
      id: 4,
      name: 'Jane Doe',
      date: '2022-09-01T00:00:00',
      subject: 'New message',
      text: 'Hello, I would like to preorder your new art piece. I am interested in the digital version. Can you please provide me with more information?'
    },
    {
      id: 5,
      name: 'John Doe',
      date: '2022-09-01T00:00:00',
      subject: 'New message',
      text: 'Hello, I would like to preorder your new art piece. I am interested in the digital version. Can you please provide me with more information?'
    },
    {
      id: 6,
      name: 'Jane Doe',
      date: '2022-09-01T00:00:00',
      subject: 'New message',
      text: 'Hello, I would like to preorder your new art piece. I am interested in the digital version. Can you please provide me with more information?'
    }
  ]

  return (
    <ScrollArea className='h-[70vh]'>
      <div className='flex flex-col gap-2 p-4 pt-0'>
        {items.map((item) => (
          <NavLink
            key={item.id}
            to={`/creator/dashboard/preorder/${item.id}`}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent bg-background',
                isActive && 'bg-secondary'
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className='flex w-full flex-col gap-1'>
                  <div className='flex items-center'>
                    <div className='flex items-center gap-2'>
                      <div className='font-semibold'>{item.name}</div>
                      {/* {!item.read && <span className='flex h-2 w-2 rounded-full bg-blue-600' />} */}
                    </div>
                    <div className={cn('ml-auto text-xs', isActive ? 'text-foreground' : 'text-muted-foreground')}>
                      {formatDistanceToNow(new Date(item.date), {
                        addSuffix: true
                      })}
                    </div>
                  </div>
                  <div className='text-xs font-medium'>
                    Offer: <span className='font-bold text-red-500'>{'200'}$</span>
                  </div>
                </div>
                <div className='line-clamp-2 text-xs text-muted-foreground'>{item.text.substring(0, 300)}</div>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </ScrollArea>
  )
}

export default ItemList
