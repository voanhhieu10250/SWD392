import CategoriesCarousel from '~/components/HomePage/CategoriesCarousel'
import RecentArts from '~/components/HomePage/RecentArts'
import TrendingArts from '~/components/HomePage/TrendingArts'

export default function Home() {
  return (
    <div className='mt-6'>
      <CategoriesCarousel />
      <div className='mt-6 bg-background rounded-xl shadow-sm px-4 py-5'>
        <div>
          <h3 className='scroll-m-20 mt-4 mb-6 pl-2.5 text-xl font-semibold tracking-tight'>Trending Arts</h3>
          <TrendingArts />
        </div>
        <div>
          <h3 className='scroll-m-20 mt-4 mb-4 pl-2.5 text-xl font-semibold tracking-tight'>Recent</h3>
          <RecentArts />
        </div>
      </div>
    </div>
  )
}
