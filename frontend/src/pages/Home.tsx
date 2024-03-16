import CategoriesCarousel from '~/components/HomePage/CategoriesCarousel'
import TopArtThisWeek from '~/components/HomePage/TopArtThisWeek'

export default function Home() {
  return (
    <div className='mt-6'>
      <CategoriesCarousel />
      <div className='mt-6 bg-background rounded-xl shadow-sm px-4 py-5'>
        <TopArtThisWeek />
        {/* <BrowseArts /> */}
      </div>
    </div>
  )
}
