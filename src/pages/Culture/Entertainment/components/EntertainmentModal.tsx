import React from "react";
import Image from "next/image";
import CloseButton from "../../../../assets/webp/close_button_gray.webp";
import { EntertainmentItem } from "../../../../constants/CultureData";

interface EntertainmentModalProps {
  entertainment: EntertainmentItem;
  onClose: () => void;
}

const EntertainmentModal = ({ entertainment, onClose }: EntertainmentModalProps) => {
  if (!entertainment) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-5 max-w-[324px] w-full relative">
        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-4 right-4">
          <Image
            src={CloseButton}
            alt="Close Button"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </button>

        {/* 제목 */}
        <h2 className="text-lg font-bold text-gray-900 mb-5">{entertainment.title}</h2>

        {/* 이미지 */}
        <div className="mb-4">
          <Image
            src={entertainment.image}
            alt={entertainment.title}
            width={500}
            height={300}
            className="w-full rounded-lg object-cover max-h-[165px]"
          />
        </div>

        {/* 구분선 */}
        <div className="border-t border-gray-300 my-4"></div>

        {/* 설명 */}
        <div className="text-sm text-gray-600 mb-4">
          <p>{entertainment.description}</p>
        </div>

        {/* 팁 */}
        <div className="text-sm text-main-50 font-semibold">
          ❗️ {entertainment.tip}
        </div>
      </div>
    </div>
  );
};

export default EntertainmentModal;
