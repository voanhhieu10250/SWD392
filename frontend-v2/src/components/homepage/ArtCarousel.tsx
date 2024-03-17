import { getTopArtsThisWeek } from "@/actions";
import { ArtType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContentWithScrollbar,
  CarouselItem,
} from "../ui/carousel";

const ArtCarousel = async () => {
  const arts = await getTopArtsThisWeek();

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
      <CarouselContentWithScrollbar className="-ml-1.5">
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
                unoptimized
              />
              <div className="bg-gradient-to-t from-black/40 to-transparent absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
                <span className="absolute bottom-0 left-0 pb-1.5 px-3 w-full font-semibold text-white text-sm truncate">
                  {art.title}
                </span>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContentWithScrollbar>
    </Carousel>
  );
};

export default ArtCarousel;
