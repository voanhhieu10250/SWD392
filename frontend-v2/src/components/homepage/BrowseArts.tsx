import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import WhatIsHot from "./WhatIsHot";
import Spinner from "./Spinner";
import RecentArts from "./RecentArts";

const BrowseArts = () => {
  return (
    <div>
      <h3 className="scroll-m-20 mt-4 mb-4 pl-2.5 text-xl font-semibold tracking-tight">
        Browse
      </h3>
      <Tabs defaultValue="hot" className="pl-2.5">
        <TabsList className="h-auto">
          <TabsTrigger value="hot" className="text-xs">
            What&apos;s Hot
          </TabsTrigger>
          <TabsTrigger value="recent" className="text-xs">
            Recent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hot" className="mt-4">
          <Suspense fallback={<Spinner />}>
            <WhatIsHot />
          </Suspense>
        </TabsContent>
        <TabsContent value="recent" className="mt-4">
          <Suspense fallback={<Spinner />}>
            <RecentArts />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BrowseArts;
