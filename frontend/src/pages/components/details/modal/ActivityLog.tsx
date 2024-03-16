import React, {useEffect, useState} from "react";
import {MdOutlineClose} from "react-icons/md";

interface ActivityLogProps {
  popup: boolean;
  onClose: () => void;
}

const ActivityLog: React.FC<ActivityLogProps> = ({ popup, onClose }) => {
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
          <div className="bg-gray-900 bg-opacity-75 rounded-lg p-8 max-w-xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-white text-lg font-bold">Activity Log</h3>
              <button className="text-white" onClick={handleCloseClick}>
                <MdOutlineClose/>
              </button>
            </div>
            <div className="flex items-center mb-4">
              <div className="mr-4 flex items-center">
                <img
                  src="https://cdn.sforum.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg"
                  alt="Featured"
                  className="w-16 h-16 rounded"
                />
              </div>
                <div className="flex-1">
                  <p className="text-white font-bold">PragmaticWisdom</p>
                  <p className="text-white">Current Owner</p>
                </div>
                <div>
                  <p className="text-white">Bought for $12</p>
                  <p className="text-white text-right">Jan 10, 2024</p>
                </div>
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white rounded transition-all duration-300 ease-in-out"
                onClick={handleCloseClick}>
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
      {showPopup && <div className="fixed inset-0 bg-black opacity-50 z-40"/>}
    </div>
  )
}

export default ActivityLog;