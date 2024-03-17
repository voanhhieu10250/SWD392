import { getUserProfile } from "@/actions";
import ArtList from "@/components/profilepage/ArtList";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { notFound } from "next/navigation";

const Profile = async ({ params }: { params: { userId: string } }) => {
  const userId = params.userId;
  const user = await getUserProfile(userId);

  if (user.error) {
    return <div>{user.message}</div>;
  }
  if (!user.data) {
    notFound();
  }

  return (
    <div className="mb-4 pt-10 space-y-5">
      {/* Banner section */}
      <div className="bg-background rounded-xl overflow-hidden">
        <div className="relative w-full object-fill h-80">
          <Image
            src="https://www.artfol-image.me/5f63228178773c3863b1af5b/8694c15ca4e148e0b37abf855eb25cd1.jpg"
            alt=""
            fill
            unoptimized
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex h-24 gap-3 mb-4 relative -top-8 items-center">
          <div className="relative w-40 h-40 ml-10">
            <Image
              src={
                "https://api.dicebear.com/5.x/adventurer/svg?seed=" +
                user.data.name
              }
              alt=""
              className="rounded-full border-border bg-background border-8 aspect-square"
              fill
            />
          </div>
          <div className="mt-2 space-y-2">
            <div>
              <Button className="font-semibold rounded-xl">Follow</Button>
            </div>
            <div className="font-bold text-3xl">{user.data.name}</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-5">
        <div className="w-full md:basis-1/3 bg-background rounded-xl shadow-sm p-5 text-sm space-y-5">
          <p className="text-sm font-semibold">Collections</p>
          <div className="flex gap-2">
            <div className="block basis-1/2 relative rounded-lg overflow-hidden aspect-square">
              <Image
                src="https://i.imgur.com/6rp0Xs2.png"
                alt=""
                fill
                className="w-full h-auto"
                unoptimized
              />
              <div className="bg-gradient-to-t from-black/40 to-transparent absolute inset-0 opacity-0 hover:opacity-100 transition-opacity">
                <span className="absolute bottom-0 left-0 pb-1.5 px-3 w-full font-semibold text-white text-sm truncate">
                  Favorite
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:basis-2/3 bg-background rounded-xl shadow-sm p-5 text-sm space-y-5">
          <p className="text-sm font-semibold">Gallery</p>
          <ArtList arts={user.data.arts || []} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
