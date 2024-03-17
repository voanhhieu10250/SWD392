import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Flag } from 'lucide-react'
import { toast } from 'react-toastify'
import useAuth from '~/hooks/useAuth'
import { ResponseObj } from '~/types'
import axios from 'axios'; // Import axios library

const ReportPopup = ({ artId }: { artId: number }) => {

    const { user } = useAuth();
    
    const handleReport = async (selectedOption: string) => {
        try {
            // Send report request to the server with selected option
            const data = JSON.stringify({
                "art": {
                    "id": artId
                },
                "reporterUser": {
                    "id": user?.id
                },
                "description": selectedOption
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost:8080/report/',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : data
            };

            const response = await axios.request(config);
            console.log('Report submitted:', response.data);
            toast.success('Report submitted successfully.');
        } catch (error) {
            console.error('Error submitting report:', error);
            toast.error((error as ResponseObj<null>).msg || 'An error occurred while submitting the report.');
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='outline' size='sm' className='space-x-1 rounded-lg mr-3'>
                    <Flag size={16} />
                    <p>Make a Report</p>
                </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                {user && user.id !== artId && (
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
                            <Button onClick={() => { }}>Submit</Button>
                        </DialogFooter>
                    </>
                )}
                {user && user.id === artId && <div>You cannot report your own art.</div>}
                {!user && <div>You need to be logged in to report this art.</div>}
            </DialogContent>
        </Dialog>
    )
}

export default ReportPopup;
