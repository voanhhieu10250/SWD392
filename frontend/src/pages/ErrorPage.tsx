import { useRouteError } from 'react-router'

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <h1 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{(error as { statusText: string }).statusText || (error as Error).message}</i>
      </p>
    </div>
  )
}
