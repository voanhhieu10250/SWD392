"use client";

import { Art } from "@/types";
import Image from "next/image";
import Link from "next/link";
import Masonry from "react-masonry-css";

const ArtList = ({ arts }: { arts: Art[] }) => {
  return (
    <div>
      <Masonry
        breakpointCols={3}
        className="flex w-full gap-x-3"
        columnClassName="my-masonry-grid_column"
      >
        {arts?.map((art, index) => (
          <Link
            className="block w-full relative rounded-lg overflow-hidden mb-3"
            key={index}
            href={`/art/${art.id}`}
          >
            <Image
              src={art.originUrl}
              alt=""
              width={240}
              height={240}
              className="w-full h-auto"
              unoptimized
            />
            <div className="bg-gradient-to-t from-black/40 to-transparent absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
              <span className="absolute bottom-0 left-0 pb-1.5 px-3 w-full font-semibold text-white text-sm truncate">
                {art.title}
              </span>
            </div>
          </Link>
        ))}
      </Masonry>
    </div>
  );
};

export default ArtList;
