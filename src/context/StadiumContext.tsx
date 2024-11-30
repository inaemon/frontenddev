import React, { createContext, useState, useContext, ReactNode } from "react";
import { StadiumType } from "@/src/constants/ZoneData";
import { ZoneGetResponseType } from "@/src/api/StadiumApiType"; 

// 1. Context 타입 정의
interface StadiumContextType {
  selectedStadium: StadiumType;
  setSelectedStadium: (stadium: StadiumType) => void;
  selectedSection: string;
  setSelectedSection: (section: string) => void;
  selectedSectionColor: string;
  setSelectedSectionColor: (color: string) => void;
  zoneNameList: string[];
  setZoneNameList: (zones: string[]) => void;
  stadiumInfo: ZoneGetResponseType | undefined;
  setStadiumInfo: (info: ZoneGetResponseType | undefined) => void;
}

// 2. 기본값 설정
const StadiumContext = createContext<StadiumContextType | undefined>(undefined);

// 3. Context Provider 컴포넌트
export const StadiumProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 프론트에서 선택한 스타디움 값 전역 관리 변수
  const [selectedStadium, setSelectedStadium] = useState<StadiumType>(StadiumType.JAMSIL);  // 초기값: 잠실
  
  // 프론트에서 선택한 스타디움에 따른 좌석(zone) 리스트 전역 관리 변수
  const [zoneNameList, setZoneNameList] = useState<string[]>([]);

  // 프론트에서 선택한 스타디움에 따른 좌석(zone) 값 전역 관리 변수
  const [selectedSection, setSelectedSection] = useState<string>("");

  // 좌석 색상, selectedSection과 mapping
  const [selectedSectionColor, setSelectedSectionColor] = useState<string>("");

  // 백엔드로부터 받아온 스타디움 정보 값 전역 관리 변수
  const [stadiumInfo, setStadiumInfo] = useState<ZoneGetResponseType>();

  return (
    <StadiumContext.Provider value={{
      selectedStadium, setSelectedStadium,
      selectedSection, setSelectedSection,
      selectedSectionColor, setSelectedSectionColor,
      zoneNameList, setZoneNameList,
      stadiumInfo, setStadiumInfo
    }}>
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
