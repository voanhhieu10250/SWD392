import {BiSolidComment, BiSolidLike, BiStar} from "react-icons/bi";
import Description from "~/pages/components/details/Description.tsx";
import {useState} from "react";
import {RiRepeatFill} from "react-icons/ri";
import {FaAngleRight} from "react-icons/fa6";
import {FaRegHeart} from "react-icons/fa";
import Collection from "~/pages/components/details/modal/Collection.tsx";
import Offer from "~/pages/components/details/modal/Offer.tsx";

function PhysicalArtPage() {
  const [imageInfo, setImageInfo] = useState<{ width: number; height: number; sizeInMB: number } | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopupOffer, setShowPopupOffer] = useState(false);

  const handleButtonClickCollection = () => {
    setShowPopup(true);
  };

  const handleCloseCollection = () => {
    setShowPopup(false);
  };

  const handleButtonClickOffer = () => {
    setShowPopupOffer(true);
  };

  const handleCloseOffer = () => {
    setShowPopupOffer(false);
  };

  const handleImageLoad = async (event: React.SyntheticEvent<HTMLImageElement>) => {
    const imageElement = event.target as HTMLImageElement;

    const width = imageElement.naturalWidth;
    const height = imageElement.naturalHeight;
    const sizeInBytes = await fetchImageSizeInBytes(imageElement.src);
    const sizeInMB = sizeInBytes / (1024 * 1024);

    setImageInfo({ width, height, sizeInMB });
  };

  const fetchImageSizeInBytes = async (imageUrl: string): Promise<number> => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return blob.size;
    } catch (error) {
      console.error('Error loading image:', error);
      throw error;
    }
  };

  return (
    <div className="flex justify-center">
      <div className="h-[100%] bg-gray-300 p-8 rounded-md">
        {/*Image*/}
        <div className="mb-2 inline-flex flex-col">
          <div className="w-[100%]">
            <img
              src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8adefab8-9a4e-4fa7-8ad7-e2e4cf9cf1e9/dgrizg7-b476191f-192c-45d4-974b-2d1b6f66f042.jpg/v1/fill/w_1192,h_670,q_70,strp/valoran_by_kikoldraws_dgrizg7-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQ0MCIsInBhdGgiOiJcL2ZcLzhhZGVmYWI4LTlhNGUtNGZhNy04YWQ3LWUyZTRjZjljZjFlOVwvZGdyaXpnNy1iNDc2MTkxZi0xOTJjLTQ1ZDQtOTc0Yi0yZDFiNmY2NmYwNDIuanBnIiwid2lkdGgiOiI8PTI1NjAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Bz92275qwqYlBH9FENXMlKZIAqIT8kp_z7z4UZmS0yg"
              alt=""
              className="object-contain w-full"
              onLoad={handleImageLoad}/>
          </div>
        </div>

        <div className="ml-2">
          {/*Button*/}
          <div className="mt-2">
            <div className="flex justify-between">
              <div className="flex justify-between">
                <button className="hover:text-green-500 flex items-center mr-1 transition-all duration-200" onClick={handleButtonClickCollection}>
                  <span className="mr-1"><BiStar/></span>
                  <span className="font-bold">Add to Collection</span>
                </button>
              </div>

              <Collection popup={showPopup} onClose={handleCloseCollection}/>

              <div className="flex justify-between mr-2">
                <button className="hover:text-green-500 flex items-center mr-1 transition-all duration-200">
                  <span className="mr-1"><BiSolidLike/></span>
                  <span className="font-bold">Like</span>
                </button>
                <button
                  className="border-2 border-black p-2 rounded-full flex items-center ml-1 hover:border-green-500 hover:text-green-500 transition-all duration-200"
                  onClick={handleButtonClickOffer}>
                  <span className="font-bold">Make an Offer</span>
                </button>
              </div>
            </div>

            <Offer popup={showPopupOffer} onClose={handleCloseOffer}/>
          </div>

          {/*Information*/}
          <div className="mt-4">
            <div className="flex justify-between">
              <div className="inline-flex ">
                <div>
                  <img src="https://i.pinimg.com/236x/db/c4/f7/dbc4f7f26f83a1cedc0aa9523550ff26.jpg" alt="Avatar"
                       width={50} className="rounded-lg"/>
                </div>
                <div className="ml-2">
                  <h1 className="font-bold text-xl">Valorant</h1>
                  <div className="">
                    <span className="text-gray-500">by</span>
                    <a href="" className="ml-1 hover:text-green-500 font-bold">LetMeKnow</a>
                  </div>
                </div>
              </div>

              <div className="mr-2">
                <span className="text-gray-500">Published: Yesterday</span>
              </div>
            </div>
          </div>

          {/*Activity Log*/}
          <div className="mt-2">
            <div className="flex justify-center">
              <div className="bg-gray-400 p-3">
                <div className="flex justify-center mb-2">
                    <span className="text-white font-bold">Activity Log</span>
                </div>
                <div className="flex justify-between">
                  <div className="inline-flex">
                    <div>
                      <img src="https://i.pinimg.com/236x/db/c4/f7/dbc4f7f26f83a1cedc0aa9523550ff26.jpg" alt="Avatar"
                           width={50} className="rounded-lg"/>
                    </div>
                    <div className="ml-2 mr-4">
                      <h1 className="text-gray-300">Current Owner</h1>
                      <div className="">
                        <a href="" className="ml-1 text-white hover:text-green-300 font-bold transition-all duration-200">LetMeKnow</a>
                      </div>
                    </div>
                  </div>
                  <div className="mr-1 ml-4">
                    <div>
                      <span className="text-gray-300">Bought for $12</span>
                    </div>
                    <div>
                      <span className="text-gray-300">Jan 20, 2024</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <button className="mt-2 text-white hover:text-green-300 transition-all duration-200 flex items-center">
                    <span className="mr-1"><RiRepeatFill /></span>
                    <span className="font-bold">Traded 1 time</span>
                    <span className="ml-1"><FaAngleRight/></span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/*Like and Comment*/}
          <div className="mt-2">
            <div className="flex">
              <div className=" inline-flex items-center text-gray-500">
                <span className="mr-1"><BiSolidLike/></span>
                <span className="font-semibold">50 Likes</span>
              </div>
              <div className="ml-4 inline-flex items-center text-gray-500">
                <span className="mr-1"><BiSolidComment/></span>
                <span className="font-semibold">15 Comment</span>
              </div>
            </div>
          </div>

          {/*Description*/}
          <div className="mt-2">
            <div className="max-w-3xl">
              <Description
                text={"Tả con trâu nằm trong bài văn Tả con vật, có trong chương trình của cả 3 bộ sách Kết nối tri thức, Chân trời sáng tạo, Cánh diều. Vậy mời các em cùng theo dõi bài viết dưới đây của Download.vn để có thêm nhiều vốn từ, nhanh chóng hoàn thiện bài văn của mình thật hay."}
                maxLength={50}/>
            </div>
          </div>

          {/*Image Size*/}
          <div className="mt-2">
            {imageInfo && (
              <div className="text-gray-500">
                <p>Image size: {imageInfo.width}x{imageInfo.height}px {imageInfo.sizeInMB.toFixed(2)} MB</p>
              </div>
            )}
          </div>

          {/*Comment*/}
          <div className="mt-2">
            <div className="mb-1">
              <span className="mr-1 font-bold">Comments</span>
              <span className="font-sans">15</span>
            </div>
            <div className="grid grid-cols-12 p-4">
              <div className="col-span-1">
                <img src="https://i.pinimg.com/236x/db/c4/f7/dbc4f7f26f83a1cedc0aa9523550ff26.jpg" alt="Avatar"
                     width={50} className="rounded-lg"/>
              </div>
              <div className="col-span-11">
                <form action="" method="post">
                  <textarea name="comment" placeholder="Write a comment"
                            className="w-full h-[200px] resize-none bg-gray-500 text-white p-2"></textarea>
                  <div className="flex justify-end">
                    <button type="submit"
                            className="p-2 bg-blue-500 rounded-md text-white hover:bg-blue-700 transition-all duration-300 ease-in-out">Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="grid grid-cols-12 p-4 border-b border-gray-200">
              <div className="col-span-1">
                <img src="https://i.pinimg.com/236x/db/c4/f7/dbc4f7f26f83a1cedc0aa9523550ff26.jpg" alt="Avatar"
                     width={50} className="rounded-lg"/>
              </div>
              <div className="col-span-11">
                <div className="p-2 pb-4">
                  <div className="inline-flex">
                    <h4 className="font-semibold mr-2">John Doe</h4>
                    <span className="text-gray-500 ml-2">Jan 10, 2024</span>
                  </div>
                  <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>

                <div className="mt-1">
                  <div className="flex items-center">
                    <span className="mr-1 text-xl">
                      <FaRegHeart/>
                    </span>
                    <div className="ml-1">
                      <span className="text-xl">2</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhysicalArtPage;