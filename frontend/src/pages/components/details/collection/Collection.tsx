import {useEffect, useState} from "react";
import {MdOutlineClose} from "react-icons/md";
import {IoIosAdd} from "react-icons/io";

interface CollectionProps {
  popup: boolean;
  onClose: () => void;
}

const Collection: React.FC<CollectionProps> = ({ popup, onClose }) =>  {
  const [showPopup, setShowPopup] = useState(popup);

  const handleCloseClick = () => {
    setShowPopup(false);
    onClose();
  };

  useEffect(() => {
    setShowPopup(popup);
  }, [popup]);

  return (
    <div>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-900 bg-opacity-75 rounded-lg p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-bold">Add to Collection</h3>
              <button className="text-white" onClick={handleCloseClick}>
                <MdOutlineClose />
              </button>
            </div>
            <div className="flex items-center mb-4">
              <div className="mr-4 flex items-center">
                <input type="checkbox" className="mr-2 checkbox"/>
                <img
                  src="https://cdn.popsww.com/blog/sites/2/2022/12/top-anime-nam-dep.jpg"
                  alt="Featured"
                  className="w-16 h-16 rounded"
                />
              </div>
              <div>
                <p className="text-white">Featured</p>
                <p className="text-white">1 deviation</p>
              </div>
            </div>
            <div className="flex justify-between">
              <button className="mr-2 px-4 py-2 text-white flex items-center hover:text-green-500">
                <span className="mr-1 text-xl"><IoIosAdd /></span>
                <span className="font-bold">New Collection</span>
              </button>
              <button className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded transition-all duration-300 ease-in-out" onClick={handleCloseClick}>
                Done
              </button>
            </div>
          </div>
        </div>
      )}
      {showPopup && <div className="fixed inset-0 bg-black opacity-50 z-40"/>}
    </div>
  )
}

export default Collection;