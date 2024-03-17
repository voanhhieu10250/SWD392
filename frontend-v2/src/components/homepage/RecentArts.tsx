import { getRecentArts } from "@/actions";
import InfiniteScroll from "./InfiniteScroll";

const RecentArts = async () => {
  const arts = await getRecentArts();

  if (arts.error) {
    return <div>Failed to fetch arts</div>;
  }

  return <InfiniteScroll intialData={arts.data} content="recent" />;
};

export default RecentArts;
