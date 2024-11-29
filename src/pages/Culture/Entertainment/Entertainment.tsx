import React, { useState } from "react";
import EntertainmentModal from "./components/EntertainmentModal";
import EntertainmentPhotoCard from "./components/EntertainmentPhotoCard";
import { EntertainmentItem } from "../../../constants/CultureData";

interface EntertainmentProps {
  data: {
    internal: EntertainmentItem[];
    external: EntertainmentItem[];
  };
}

const Entertainment = ({ data }: EntertainmentProps) => {
  const [selectedEntertainment, setSelectedEntertainment] = useState<EntertainmentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (entertainment: EntertainmentItem) => {
    setSelectedEntertainment(entertainment);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-grayscale-5 pb-16">
      {/* 내부 */}
      <section>
        <h2 className="text-lg font-bold mb-4">구장 내부</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-8">
          {data.internal.map((item, idx) => (
            <EntertainmentPhotoCard
              key={idx}
              entertainment={item}
              onClick={() => handleCardClick(item)}
            />
          ))}
        </div>
      </section>

      {/* 외부 */}
      <section className="mt-6">
        <h2 className="text-lg font-bold mb-4">구장 외부</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-8">
          {data.external.map((item, idx) => (
            <EntertainmentPhotoCard
              key={idx}
              entertainment={item}
              onClick={() => handleCardClick(item)}
            />
          ))}
        </div>
      </section>

      {/* 모달 */}
      {isModalOpen && selectedEntertainment && (
        <EntertainmentModal
          entertainment={selectedEntertainment}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Entertainment;
