import { Button } from "../ui/button";

const RecentlyNewArts = () => {
  return (
    <div>
      <h3 className="scroll-m-20 mt-4 mb-6 pl-2.5 text-xl font-semibold tracking-tight">
        Browse
      </h3>
      <div className="space-x-4 pl-2.5 mb-6">
        <Button size="sm" variant="outline" className="text-xs">What&apos;s Hot</Button>
        <Button size="sm" variant="outline" className="text-xs">Recent</Button>
      </div>

    </div>
  );
};

export default RecentlyNewArts;
