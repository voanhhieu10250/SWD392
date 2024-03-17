import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Flag } from 'lucide-react'
import { toast } from 'react-toastify'
import { ResponseObj } from '~/types'
import useAuth from '~/hooks/useAuth'

const ReportPopup = ({ creatorId }: { creatorId: number }) => {
  const { user } = useAuth()

  const handleReport = (selectedOption: string) => {
    try {
      // Send report request to the server with selected option
      console.log('Report submitted:', selectedOption)
      toast.success('Report submitted successfully.')
    } catch (error) {
      console.error('Error submitting report:', error)
      toast.error((error as ResponseObj<null>).msg || 'An error occurred while submitting the report.')
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' size='sm' className='space-x-1 rounded-lg mr-3'>
          <Flag size={16} />
          <p>Make a Report</p>
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        {user && user.id !== creatorId && (
          <>
            <DialogHeader className='mb-4 text-lg font-bold'>Make a Report</DialogHeader>
            <div className='py-4'>
              <label htmlFor='reportOption' className='font-bold text-base block mb-2'>
                Choose a Report Reason
              </label>
              <select
                id='reportOption'
                className='block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200'
                onChange={(e) => handleReport(e.target.value)}
              >
                <option value='' disabled selected>
                  Select a reason...
                </option>
                <option value='spam'>Spam</option>
                <option value='inappropriate'>Inappropriate content</option>
                <option value='harassment'>Harassment</option>
                <option value='other'>Other</option>
              </select>
            </div>
            <DialogFooter>
              <Button onClick={() => {}}>Submit</Button>
            </DialogFooter>
          </>
        )}
        {user && user.id === creatorId && <div>You cannot report your own art.</div>}
        {!user && <div>You need to be logged in to report this art.</div>}
      </DialogContent>
    </Dialog>
  )
}

export default ReportPopup
