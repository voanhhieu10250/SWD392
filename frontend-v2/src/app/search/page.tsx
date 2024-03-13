import React, { Suspense } from "react";
import Filter from "../../components/searchpage/Filter";
import SearchResults from "@/components/searchpage/SearchResults";
import Spinner from "@/components/homepage/Spinner";

export default async function Search({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  // decode search query
  const searchQuery = decodeURI(searchParams.q ? searchParams.q : "");

  return (
    <div className="mt-5 relative flex justify-center items-start gap-6">
      <div className="flex-1 space-y-5">
        <div className="bg-background rounded-xl shadow-sm px-4 py-5 text-sm font-semibold">
          Showing results for &quot;{searchQuery}&quot;
        </div>
        <Suspense fallback={<Spinner />}>
          <SearchResults query={searchQuery} show={searchParams.show} />
        </Suspense>
      </div>
      <div className="sticky top-0 h-full w-72">
        <div className="bg-background rounded-xl shadow-sm py-5 text-sm">
          <Suspense>
            <Filter defaultValue="artwork" />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
