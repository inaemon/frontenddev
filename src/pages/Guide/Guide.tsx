import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../../components/layout/HeaderCenter";
import NavBar from "../../components/layout/NavBar";
import Dropdown from "../Main/components/Dropdown";
import GuideDetailContent from "./components/GuideDetailContent";
import guideJamsil from "../../assets/svg/guide_jamsil.svg";

import { StadiumType, stadiumList } from "@/src/constants/ZoneData";

import { handleGetStadiumInfo } from "@/src/api/StadiumApiHandler";
import { ZoneGetParamsType, ZoneGetResponseType, ZoneType } from "@/src/api/StadiumApiType";


const Guide = () => {
  const [selectedStadium, setSelectedStadium] = useState<StadiumType>(StadiumType.JAMSIL);
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleStadiumSelect = (stadium: StadiumType) => {
    setSelectedStadium(stadium);
    setSelectedSection(null);
  };

  const handleSectionClick = (zoneName: string) => {
    setSelectedSection(zoneName);
  };

  // 스타디움 데이터 관리
  const [stadiumInfo, setStadiumInfo] = useState<ZoneGetResponseType>();
  const handleStadiumInfo = async () => {
    const params: ZoneGetParamsType = {
      stadiumName: selectedStadium as string,
    };
    
    const stadiumApiData = await handleGetStadiumInfo(params);
    if(stadiumApiData) {
      setStadiumInfo(stadiumApiData);
    }
  }
  
  useEffect(() => {
    handleStadiumInfo();
  }, [selectedStadium]); // 쿼리 파라미터가 변경될 때마다 실행

  return (
    <div className="flex flex-col h-screen">
      <Header />
    
      <div className="flex-1 overflow-y-auto mt-[15px]">
        {selectedSection ? (
          <div>
            <GuideDetailContent stadiumName={selectedStadium} zoneName={selectedSection}/>
          </div>
        ) : (
          stadiumInfo ? (
          <>
            <Dropdown options={stadiumList} selectedOption={selectedStadium} onSelect={handleStadiumSelect} />
            <div className="mt-4">
              <Image
                src={stadiumInfo.imgUrl}
                alt={`${selectedStadium} 이미지`}
                className="w-full h-auto rounded-lg"
                width={370}
                height={198}
              />
              <p className="text-center text-sm font-medium text-gray-700 mt-2">{stadiumInfo.introduction}</p>
            </div>

            <h2 className="mt-6 text-lg font-bold text-left text-gray-700">궁금하신 구역을 선택해주세요!</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {stadiumInfo.zones.map((zone, zoneIndex) => (
                <button
                  key={zone.zoneName}
                  className="flex items-center justify-start h-12 bg-gray-100 rounded-lg"
                  onClick={() => handleSectionClick(zone.zoneName)}
                  style={{ color: zone.zoneColor }}
                >
                  <div className={`w-3 h-3 rounded-sm ml-3 mr-2 ${zone.zoneColor}`} />
                  <span className="text-gray-700 text-sm font-medium">{zone.zoneName}</span>
                </button>
              ))}
            </div>
          </>
            ): null
        )}
      </div>

      <NavBar />
    </div>
  );
};

export default Guide;
