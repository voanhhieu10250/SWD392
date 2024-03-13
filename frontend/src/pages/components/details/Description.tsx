import React, { useState } from 'react';

interface DescriptionProps {
  text: string;
  maxLength: number;
}

const Description: React.FC<DescriptionProps> = ({ text, maxLength }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleShowFullText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div>
      <p>
        {showFullText ? text : `${text.slice(0, maxLength)}...`}
      </p>
      {text.length > maxLength && (
        <button type="button" onClick={toggleShowFullText} className="text-gray-500">
          {showFullText ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default Description;