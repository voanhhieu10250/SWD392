import { getArtDetailMoreArts } from "@/actions";
import Image from "next/image";
import Link from "next/link";

const MoreArts = async () => {
  const arts = await getArtDetailMoreArts();

  if (arts.error) {
    return <div>{arts.message}</div>;
  }

  if (!arts.data) {
    return <div>No data</div>;
  }

  return (
    <div className="flex justify-stretch items-center gap-2">
      {arts.data.map((art, index) => (
        <Link
          className="block basis-1/3 relative rounded-lg overflow-hidden aspect-square"
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
    </div>
  );
};

export default MoreArts;
