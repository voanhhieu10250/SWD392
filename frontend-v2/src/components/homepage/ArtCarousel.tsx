import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import Link from "next/link";
import { getTopArtThisWeek } from "@/actions";
import { ArtType } from "@/types";

const ArtCarousel = async () => {
  const arts = await getTopArtThisWeek(ArtType.digital);

  if (arts.error) {
    return <div>Failed to fetch arts</div>;
  }

  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
      }}
      className="w-full"
    >
      <CarouselContent withScrollbar className="-ml-1.5">
        {arts.data.map((art, index) => (
          <CarouselItem key={index} className="pl-1.5 basis-auto">
            <Link
              href={"/art/" + art.id}
              className="flex w-fit h-40 items-center justify-center p-0 bg-cover relative rounded-lg overflow-hidden"
            >
              <Image
                src={art.originUrl}
                alt=""
                width={240}
                height={240}
                className="w-auto h-40"
              />
              <div className="bg-gradient-to-t from-black/40 to-transparent absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
                <span className="absolute bottom-0 left-0 pb-1.5 px-3 w-full font-semibold text-white text-sm truncate">
                  {art.title}
                </span>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ArtCarousel;
