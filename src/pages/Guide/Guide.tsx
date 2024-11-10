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


import { useStadiumSelector } from '@/src/hooks/useStadiumSelector';
import { useRouter } from 'next/router';  // useRouter를 임포트합니다.

const Guide = () => {

  // 가이드 스타디움 관리
  const {
    selectedStadium,
    setSelectedStadium,
    selectedSection,
    setSelectedSection,
    selectedSectionColor,
    setSelectedSectionColor,
    zoneNameList,
    setZoneNameList,
    handleStadiumSelect,
    //handleSectionClick,
    stadiumInfo,
    setStadiumInfo
  } = useStadiumSelector();

  // 스타디움 선택시 API 연동

  const handleStadiumInfo = async () => {
    const params: ZoneGetParamsType = {
      stadiumName: selectedStadium as string,
    };
    
    const stadiumApiData = await handleGetStadiumInfo(params);
    if(stadiumApiData) {
      setStadiumInfo(stadiumApiData);
      //console.log(stadiumApiData.zones);
      setZoneNameList(stadiumApiData.zones.map(zone => zone.zoneName));

      const selectedZoneColor = stadiumApiData.zones.find(zone => zone.zoneName === selectedSection)?.zoneColor;
      if(selectedZoneColor) {
        setSelectedSectionColor(selectedZoneColor);
      }
    }
  }
  useEffect(() => {
    handleStadiumInfo();
  }, [selectedStadium]); // 쿼리 파라미터가 변경될 때마다 실행
  // Zone 클릭시 가이드 세부 페이지로 이동 및 API 데이터를 쿼리 파라미터로 전달
  const router = useRouter();
  const handleSectionClick = (selectedZone: string) => {
    setSelectedSection(selectedZone);
    if(stadiumInfo){
      const selectedZoneColor = stadiumInfo.zones.find(zone => zone.zoneName === selectedSection)?.zoneColor;
      
      if(selectedZoneColor) {
        setSelectedSectionColor(selectedZoneColor);
      }
    }
  };

  useEffect(() => {
    // zone을 클릭했으면
    if (selectedSection !== "" && selectedSectionColor !== "") {
      moveDetailPage();
    }
  }, [selectedSection, selectedSectionColor]);

  const moveDetailPage = () => {
    // 선택된 섹션에 따라 리다이렉트
    router.push({
      pathname: '/guide/zone',  // 리다이렉트할 경로
      query: {                  // 쿼리 파라미터 전달
        stadiumName: selectedStadium,
        zoneName: selectedSection,
        zoneColor: selectedSectionColor,
        zoneNameList: zoneNameList,
      },
    });
  
    setTimeout(() => {
      setSelectedSection("");
      setSelectedSectionColor("");
    }, 100);  // 100ms 지연 후 초기화
  }

  // router가 '/guide/zone' 경로로 이동할 때 상태 초기화
  useEffect(() => {
    console.log(router.pathname);
    if (router.pathname !== '/guide') {
      setSelectedSection("");
      setSelectedSectionColor("");
    }
  }, [router.pathname]);


  return (
    <div className="flex flex-col w-full">
      <Header />
      <div className="flex-1 overflow-y-auto pb-20 mt-[15px] px-4">
        {(stadiumInfo ? (
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
                  <div className="w-3 h-3 rounded-sm ml-3 mr-2" style={{ backgroundColor: zone.zoneColor }}/>
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
