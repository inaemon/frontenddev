import { useState, useEffect } from "react";
import { StadiumType } from "@/src/constants/ZoneData";
import { ZoneGetParamsType, ZoneGetResponseType } from "@/src/api/StadiumApiType";  // 타입들 import
import { handleGetStadiumInfo } from "@/src/api/StadiumApiHandler"; // API 호출 함수

import { useStadiumContext } from "@/src/context/StadiumContext";

export const useStadiumSelector = () => {
  const { 
    selectedStadium, setSelectedStadium, 
    selectedSection, setSelectedSection, 
    selectedSectionColor, setSelectedSectionColor, 
    zoneNameList, setZoneNameList, 
    stadiumInfo, setStadiumInfo 
  } = useStadiumContext();

  // 스타디움 변경 시, 스타디움 정보 및 구역명 리스트를 가져옵니다.
  const handleStadiumInfo = async () => {
    // 유효하지 않으면 API 호출하지 않음
    if (!selectedStadium) {
      console.log("유효하지 않은 스타디움 값입니다: " + selectedStadium);
      return;
    }
    
    const params: ZoneGetParamsType = {
      stadiumName: selectedStadium as string,
    };

    // API 호출
    const stadiumApiData = await handleGetStadiumInfo(params);
    if (stadiumApiData) {
      setStadiumInfo(stadiumApiData);
      setZoneNameList(stadiumApiData.zones.map(zone => zone.zoneName));

      // 선택된 구역의 색상 업데이트
      const selectedZoneColor = stadiumApiData.zones.find(zone => zone.zoneName === selectedSection)?.zoneColor;
      if (selectedZoneColor) {
        setSelectedSectionColor(selectedZoneColor);
      }
    }
  };

  // 스타디움 변경될 때마다 호출
  useEffect(() => {
    handleStadiumInfo();
  }, [selectedStadium, selectedSection]);  // selectedStadium 또는 selectedSection이 변경될 때마다 실행

  // 스타디움 선택 핸들러
  const handleStadiumSelect = (stadium: StadiumType) => {
    setSelectedStadium(stadium);
    setSelectedSection(StadiumType.NONE);  // 스타디움이 바뀌면 구역을 초기화
  };

  // 구역 클릭 핸들러
  const handleSectionClick = (zoneName: string) => {
    setSelectedSection(zoneName);
  };

  

  return {
    selectedStadium,
    setSelectedStadium,
    selectedSection,
    setSelectedSection,
    selectedSectionColor,
    setSelectedSectionColor,
    zoneNameList,
    setZoneNameList,
    handleStadiumSelect,
    handleSectionClick,
    stadiumInfo,
    setStadiumInfo
  };
};
