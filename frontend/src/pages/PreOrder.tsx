import { Outlet } from 'react-router'
import ItemList from '~/components/CreatorDashboard/PreOrder/ItemList'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '~/components/ui/resizable'
import { Separator } from '~/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
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
          <Tabs defaultValue='offers'>
            <div className='flex items-center px-4 py-2'>
              <h1 className='text-xl font-bold'>Pre-order</h1>
              <TabsList className='ml-auto'>
                <TabsTrigger value='offers' className='text-zinc-600 dark:text-zinc-200'>
                  Your Offers
                </TabsTrigger>
                <TabsTrigger value='orders' className='text-zinc-600 dark:text-zinc-200'>
                  Your Orders
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <TabsContent value='orders' className='m-0 mt-4'>
              <ItemList />
            </TabsContent>
            <TabsContent value='offers' className='m-0 mt-4'>
              <ItemList />
            </TabsContent>
          </Tabs>
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
