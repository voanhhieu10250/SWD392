import ArtCarousel from "./ArtCarousel";

const TopArtThisWeek = () => {
  return (
    <div>
      <h3 className="scroll-m-20 mt-4 mb-6 pl-2.5 text-xl font-semibold tracking-tight">
        Top This Week
      </h3>
      <ArtCarousel />
    </div>
  );
};

export default TopArtThisWeek;
