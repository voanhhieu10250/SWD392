import Image from "next/image";
import { FolderPlus, Heart, MessageCircleMore } from "lucide-react";
import ShareDialog from "@/components/artpage/ShareDialog";
import { getArtDetail } from "@/actions";
import { notFound } from "next/navigation";
import MoreArts from "@/components/artpage/MoreArts";
import { Suspense } from "react";
import Spinner from "@/components/homepage/Spinner";
import Link from "next/link";

const ArtDetails = async ({ params }: { params: { artId: string } }) => {
  const art = await getArtDetail(params.artId);

  if (art.error) {
    return <div>{art.message}</div>;
  }
  if (!art.data) {
    notFound();
  }

  // to,gd,sd -> #to #gd #sd
  const transformTags = (tags: string) => {
    return tags
      .split(",")
      .map((tag) => "#" + tag.trim())
      .join(" ");
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center max-w-2xl p-4">
        <Link
          href={"/profile/" + art.data.owner.id}
          className="flex justify-center items-center gap-4"
        >
          <div className="relative w-[50px] h-[50px] overflow-hidden rounded-full bg-background">
            <Image
              src="https://api.dicebear.com/5.x/adventurer/svg?seed=hieu"
              alt="avatar"
              fill
            />
          </div>
          <div>
            <p className="text-xl font-semibold">{art.data.owner.name}</p>
          </div>
        </Link>
        <ShareDialog value={"http://localhost:3000/art/" + params.artId} />
      </div>

      <div className="flex flex-col md:flex-row gap-5 relative items-start">
        {/* main image  */}
        <div className="relative md:w-[63%] h-auto rounded-xl overflow-hidden shadow-sm">
          <Image
            src={art.data.originUrl}
            alt="avatar"
            width={700}
            height={700}
            className="w-full h-auto"
            unoptimized
          />
        </div>

        {/* details */}
        <div className="flex-1 sticky top-24">
          <div className="bg-background rounded-xl overflow-hidden space-y-4 pt-6 pb-4 px-4 shadow-sm">
            <p className="text-xl font-semibold">{art.data.title}</p>
            <p className="leading-tight">{art.data.description}</p>

            <p className="text-muted-foreground text-sm">
              {transformTags(art.data.tags)}
            </p>

            <div className="flex items-center gap-2">
              <div className="p-1 cursor-pointer">
                <Heart />
              </div>
              <div className="p-1 cursor-pointer">
                <MessageCircleMore />
              </div>
              <div className="p-1 cursor-pointer">
                <FolderPlus />
              </div>
            </div>
          </div>
          <div>
            <p className="my-5 ml-2 font-semibold">More art posts</p>
            <Suspense fallback={<Spinner />}>
              <MoreArts />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtDetails;
