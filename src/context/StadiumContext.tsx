import React, { createContext, useState, useContext, ReactNode } from "react";
import { StadiumType } from "@/src/constants/ZoneData";

// 1. Context 타입 정의
interface StadiumContextType {
  selectedStadium: StadiumType | null;
  setSelectedStadium: (stadium: StadiumType) => void;
}

// 2. 기본값 설정
const StadiumContext = createContext<StadiumContextType | undefined>(undefined);

// 3. Context Provider 컴포넌트
export const StadiumProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedStadium, setSelectedStadium] = useState<StadiumType | null>(null);

  return (
    <StadiumContext.Provider value={{ selectedStadium, setSelectedStadium }}>
      {children}
    </StadiumContext.Provider>
  );
};

// 4. Context 사용을 위한 커스텀 훅
export const useStadiumContext = (): StadiumContextType => {
  const context = useContext(StadiumContext);
  if (!context) {
    throw new Error("useStadiumContext must be used within a StadiumProvider");
  }
  return context;
};
