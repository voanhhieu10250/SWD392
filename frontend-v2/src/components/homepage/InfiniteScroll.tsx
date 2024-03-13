"use client";

import { getRecentArts, getWhatIsHotArts } from "@/actions";
import { Art } from "@/types";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Masonry from "react-masonry-css";
import Spinner from "./Spinner";

const InfiniteScroll = ({
  intialData,
  content,
}: {
  intialData: Art[];
  content: "hot" | "recent";
}) => {
  const [arts, setArts] = useState<Art[]>(intialData);
  const [page, setPage] = useState(1);
  const [last, setLast] = useState(false);
  const [ref, inView] = useInView();

  // max-width: columns
  const breakpointColumnsObj = {
    default: 5,
    1024: 3,
    768: 2,
  };

  const loadMore = useCallback(async () => {
    if (last) return;
    const data =
      content === "hot"
        ? await getWhatIsHotArts(page + 1)
        : await getRecentArts(page + 1);

    if (data.data.length) {
      setPage(page + 1);
      setArts([...arts, ...data.data]);
    } else {
      setLast(true);
    }
  }, [content, arts, page, last]);

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  return (
    <div>
      {/* <div className="columns-2 md:columns-3 lg:columns-5 space-y-3"> */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex w-full gap-x-3"
        columnClassName="my-masonry-grid_column"
      >
        {arts.map((art, index) => (
          <div
            className="w-full relative rounded-lg overflow-hidden mb-3"
            key={index}
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
          </div>
        ))}
        {/* </div> */}
      </Masonry>
      <div ref={ref}>
        {last ? (
          <div className="text-center text-gray-500">No more arts</div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
