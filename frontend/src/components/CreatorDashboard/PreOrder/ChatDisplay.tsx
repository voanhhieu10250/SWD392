import { format } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { Textarea } from '~/components/ui/textarea'

const ChatDisplay = () => {
  const mail = {
    name: 'John Doe',
    date: '2022-09-01T00:00:00',
    text: 'Hello, I would like to preorder your new art piece. I am interested in the digital version. Can you please provide me with more information?'
  }

  return (
    <div className='flex h-full flex-col'>
      {mail ? (
        <div className='flex flex-1 flex-col'>
          <div className='flex items-start p-4'>
            <div className='flex items-start gap-4 text-sm'>
              <Avatar>
                <AvatarImage alt={mail.name} />
                <AvatarFallback>
                  {mail.name
                    .split(' ')
                    .map((chunk) => chunk[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div className='grid gap-1'>
                <div className='font-semibold'>{mail.name}</div>
                <div className='line-clamp-1 font-bold'>
                  Offer: <span className='text-red-500'>{'200'}$</span>
                </div>
              </div>
            </div>
            {mail.date && (
              <div className='ml-auto text-xs text-muted-foreground'>{format(new Date(mail.date), 'PPpp')}</div>
            )}
          </div>
          <Separator />
          <div className='flex-1 whitespace-pre-wrap p-4 text-sm'>{mail.text}</div>
          <Separator className='mt-auto' />
          <div className='p-4'>
            <form>
              <div className='grid gap-4'>
                <Textarea className='p-4' placeholder={`Reply ${mail.name}...`} />
                <div className='flex items-center justify-end gap-3'>
                  <Button onClick={(e) => e.preventDefault()} size='sm' variant='destructive'>
                    Reject
                  </Button>
                  <Button onClick={(e) => e.preventDefault()} size='sm'>
                    Accept
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className='p-8 text-center text-muted-foreground'>No message selected</div>
      )}
    </div>
  )
}

export default ChatDisplay
