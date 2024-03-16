import CategoriesCarousel from '~/components/HomePage/CategoriesCarousel'
import RecentArts from '~/components/HomePage/RecentArts'
import TrendingArts from '~/components/HomePage/TrendingArts'

export default function Home() {
  return (
    <div className='mt-6'>
      <CategoriesCarousel />
      <div className='mt-6 bg-background rounded-xl shadow-sm px-4 py-5'>
        <TrendingArts />
        <RecentArts />
      </div>
    </div>
  )
}
