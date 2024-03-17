import { useRouteError } from 'react-router'

export default function NotFound() {
  const error = useRouteError()
  console.error(error)

  return (
    <div className='flex flex-col items-center justify-center w-full h-40'>
      <h1 className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>Oops!</h1>
      <p>Sorry, page not found.</p>
      <p>
        <i>404</i>
      </p>
    </div>
  )
}
