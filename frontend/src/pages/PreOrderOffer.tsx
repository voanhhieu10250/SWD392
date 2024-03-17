import { useState } from 'react'
import { Navigate } from 'react-router'
import ChatDisplay from '~/components/CreatorDashboard/PreOrder/ChatDisplay'
import OfferList from '~/components/CreatorDashboard/PreOrder/OfferList'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '~/components/ui/resizable'
import { Separator } from '~/components/ui/separator'
import useAuth from '~/hooks/useAuth'

const PreOrderOffer = () => {
  const [selectedId, setSelectedId] = useState<number>(0)
  const { user, isInitialized } = useAuth()

  if (isInitialized && !user) return <Navigate to='/login' replace />

  return (
    <ResizablePanelGroup
      direction='horizontal'
      onLayout={(sizes: number[]) => {
        document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
      }}
      className='h-full max-h-[800px] items-stretch'
    >
      <ResizablePanel defaultSize={440} minSize={30}>
        <div className='flex items-center px-4 py-2'>
          <h1 className='text-xl font-bold'>Your Offers</h1>
        </div>
        <Separator />
        <div className='m-0 mt-4'>
          <OfferList setSelectedId={setSelectedId} selectedId={selectedId} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={655}>
        <ChatDisplay orderMatch={false} itemId={selectedId} />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default PreOrderOffer
