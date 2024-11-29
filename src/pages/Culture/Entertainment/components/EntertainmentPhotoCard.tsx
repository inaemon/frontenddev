import React from "react";
import Image from "next/image";
import { EntertainmentItem } from "../../../../constants/CultureData";

interface EntertainmentPhotoCardProps {
  entertainment: EntertainmentItem;
  onClick: () => void;
}

const EntertainmentPhotoCard = ({ entertainment, onClick }: EntertainmentPhotoCardProps) => {
  if (!entertainment || !entertainment.image) return null;

  return (
    <div
      className="flex-shrink-0 w-[173px] bg-white rounded-lg cursor-pointer"
      onClick={onClick}
    >
      {/* 이미지 */}
      <Image
        src={entertainment.image}
        alt={entertainment.title}
        width={173}
        height={150}
        className="w-full h-[150px] object-cover rounded-t-lg"
      />

      {/* 내용 */}
      <div className="px-2 py-3">
        <h4 className="text-md font-bold text-grayscale-90 mb-[6px]">
          {entertainment.title}
        </h4>
        <p className="text-xs font-medium text-grayscale-80 text-justify">
          {entertainment.description}
        </p>
      </div>
    </div>
  );
};

export default EntertainmentPhotoCard;
