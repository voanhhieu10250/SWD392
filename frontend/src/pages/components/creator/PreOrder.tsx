import { Outlet } from 'react-router'
import ItemList from '~/components/CreatorDashboard/PreOrder/ItemList'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '~/components/ui/resizable'
import { TooltipProvider } from '~/components/ui/tooltip'

const PreOrder = () => {
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction='horizontal'
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(sizes)}`
        }}
        className='h-full max-h-[800px] items-stretch'
      >
        <ResizablePanel defaultSize={440} minSize={30}>
          <div className='flex items-center px-4 py-2'>
            <h1 className='text-xl font-bold'>Pre-order Requests</h1>
          </div>
          <ItemList />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={655}>
          <Outlet />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}

export default PreOrder
