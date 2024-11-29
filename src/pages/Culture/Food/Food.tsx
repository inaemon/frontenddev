import React, { useState } from "react";
import FoodModal from "./components/FoodModal";
import FoodPhotoCard from "./components/FoodPhotoCard";
import { FoodItem } from "../../../constants/CultureData";

interface FoodProps {
  data: {
    internal: {
      meals: FoodItem[];
      desserts: FoodItem[];
    };
    external: FoodItem[];
  };
}

const Food = ({ data }: FoodProps) => {
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (food: FoodItem) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-grayscale-5 pb-16">
      {/* 내부 */}
      <section>
        <h2 className="text-lg font-bold mb-4">구장 내부</h2>
        <h3 className="text-md font-semibold mb-2">식사류</h3>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-8">
          {data.internal.meals.map((food, idx) => (
            <FoodPhotoCard
              key={idx}
              food={food}
              onClick={() => handleCardClick(food)}
            />
          ))}
        </div>

        <h3 className="text-md font-semibold mb-2">후식류</h3>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-8">
          {data.internal.desserts.map((food, idx) => (
            <FoodPhotoCard
              key={idx}
              food={food}
              onClick={() => handleCardClick(food)}
            />
          ))}
        </div>
      </section>

      {/* 외부 */}
      <section className="mt-6">
        <h2 className="text-lg font-bold mb-4">구장 외부</h2>
        <div className="flex gap-4 overflow-x-auto scrollbar-hide mb-8">
          {data.external.map((food, idx) => (
            <FoodPhotoCard
              key={idx}
              food={food}
              onClick={() => handleCardClick(food)}
            />
          ))}
        </div>
      </section>

      {/* 포토카드 모달 */}
      {isModalOpen && selectedFood && (
        <FoodModal
          food={selectedFood}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Food;
