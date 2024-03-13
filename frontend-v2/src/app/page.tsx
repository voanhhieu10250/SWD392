import CategoriesCarousel from "@/components/homepage/CategoriesCarousel";
import TopArtThisWeek from "@/components/homepage/TopArtThisWeek";

export default function Home() {
  return (
    <div className="mt-6">
      <CategoriesCarousel />
      <div className="mt-6 bg-background rounded-xl shadow-sm px-4 py-5">
        <TopArtThisWeek />
      </div>
    </div>
  );
}
