import { getWhatIsHotArts } from "@/actions";
import InfiniteScroll from "./InfiniteScroll";

const WhatIsHot = async () => {
  const arts = await getWhatIsHotArts();

  if (arts.error) {
    return <div>Failed to fetch arts</div>;
  }

  return <InfiniteScroll intialData={arts.data} content="hot" />;
};

export default WhatIsHot;
