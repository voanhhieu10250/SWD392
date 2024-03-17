import {useEffect, useState} from "react";
import {MdOutlineClose} from "react-icons/md";

interface ReportProps {
  popup: boolean;
  onClose: () => void;
}

const Report: React.FC<ReportProps> = ({ popup, onClose }) => {
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
              <h3 className="text-white text-lg font-bold">Make an Report</h3>
              <button className="text-white" onClick={handleCloseClick}>
                <MdOutlineClose/>
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="offer" className="text-white block mb-1">
                Your Repoer:
              </label>
              <div className="relative">
                <span className="absolute left-2 top-1">$</span>
                <input type="text" id="offer" className="pl-8 py-1 border border-gray-300 rounded w-full text-white bg-gray-400" />
                <span className="absolute right-2 top-1">USD</span>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="note" className="text-white block mb-1">
                Add note (Optional):
              </label>
              <textarea id="note" className="w-full h-20 resize-none border border-gray-300 rounded p-2 text-white bg-gray-400" />
            </div>
            <div className="flex justify-end">
              <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={handleCloseClick}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {showPopup && <div className="fixed inset-0 bg-black opacity-50 z-40" />}
    </div>
  );
}