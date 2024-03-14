import { getSearchResults } from "@/actions";
import { unstable_noStore } from "next/cache";
import InfiniteScroll from "./InfiniteScroll";
import { headers } from "next/headers";

const SearchResults = async ({
  query,
  show = "artwork",
}: {
  query: string;
  show?: string;
}) => {
  headers();
  unstable_noStore();
  const res = await getSearchResults(query, show);

  if (res.error) {
    return <div>{res.message}</div>;
  }
  if (res.data.length === 0) {
    return <div className="grid place-items-center">No results found</div>;
  }

  return <InfiniteScroll intialData={res.data} query={query} show={show} />;
};

export default SearchResults;
