import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { getCategories } from "@/actions";
import Link from "next/link";

async function CategoriesCarousel() {
  const categories = await getCategories();

  if (categories.error) {
    return <div>{categories.message}</div>;
  }

  return (
    <Carousel
      opts={{
        align: "start",
        slidesToScroll: 5,
        duration: 15,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-1.5">
        {categories.data.map((category, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 lg:basis-1/6 pl-1.5 max-w-[146px] first:ml-6 last:mr-6"
          >
            <Card>
              <Link
                href={
                  "/search?show=" + encodeURI(category.name.toLowerCase())
                }
              >
                <CardContent
                  style={{
                    backgroundImage: `url(${category.image})`,
                  }}
                  className="flex aspect-[7/5] items-center justify-center p-6 bg-cover relative"
                >
                  <div className="bg-black opacity-30 absolute inset-0"></div>
                  <span className="absolute bottom-1.5 left-3 font-semibold text-white text-sm">
                    {category.name}
                  </span>
                </CardContent>
              </Link>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
      <div
        className={cn(
          "h-[100px] absolute w-10 right-0 top-0",
          "bg-[linear-gradient(270deg,hsl(var(--secondary))_8%,hsl(var(--secondary))_22%,transparent)]"
        )}
      ></div>
      <div
        className={cn(
          "h-[100px] absolute w-10 left-0 top-0",
          "bg-[linear-gradient(90deg,hsl(var(--secondary))_8%,hsl(var(--secondary))_22%,transparent)]"
        )}
      ></div>
    </Carousel>
  );
}

export default CategoriesCarousel;
