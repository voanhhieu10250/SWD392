"use client";

import { getSearchResults } from "@/actions";
import { Art } from "@/types";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Masonry from "react-masonry-css";
import Spinner from "../homepage/Spinner";
import Link from "next/link";

const InfiniteScroll = ({
  intialData,
  query,
  show,
}: {
  intialData: Art[];
  query: string;
  show: string;
}) => {
  const [arts, setArts] = useState<Art[]>(intialData);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(false);
  const [ref, inView] = useInView();

  const loadMore = useCallback(async () => {
    if (last) return;
    const data = await getSearchResults(query, show, page);

    if (data.data.length) {
      setPage(page + 1);
      setArts([...arts, ...data.data]);
    } else {
      setLast(true);
    }
  }, [query, show, arts, page, last]);

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  return (
    <div>
      <Masonry
        breakpointCols={3}
        className="flex w-full gap-x-3"
        columnClassName="my-masonry-grid_column"
      >
        {arts.map((art, index) => (
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
            />
            <div className="bg-gradient-to-t from-black/40 to-transparent absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
              <span className="absolute bottom-0 left-0 pb-1.5 px-3 w-full font-semibold text-white text-sm truncate">
                {art.title}
              </span>
            </div>
          </Link>
        ))}
      </Masonry>
      <div ref={ref}>
        {last ? (
          <div className="text-center text-gray-500">No more result</div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
