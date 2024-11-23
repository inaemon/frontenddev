import React, { useState, useEffect } from "react";
import BackLogoBar from "../../components/layout/BackLogoBar";
import { stadiumList } from "../../constants/ZoneData";
import StadiumSelection from "./components/StadiumSelection";
import ChatbotInputField from "./components/ChatbotInputField";

import DateBanner from "./components/DateBanner";

import RookieProfile from "./components/RookieProfile";
import RookieMessageWithTail from "./components/RookieMessageWithTail";

const Chatbot = () => {
  const [selectedStadium, setSelectedStadium] = useState<string | null>(null);
  const [showInitialMessages, setShowInitialMessages] = useState(false);
  
  useEffect(() => {
    // 챗봇 페이지 들어온 후 초기 메시지 표시
    const timer = setTimeout(() => {
      setShowInitialMessages(true);
    }, );

    return () => clearTimeout(timer);
  }, []);

  const handleStadiumSelect = (stadium: string) => {
    setSelectedStadium(stadium);
  };

  return (
    <>
      <div>
        <BackLogoBar />
      </div>
      <div className="flex justify-center items-center h-screen bg-grayscale-50 mt-[55px]">
        <div className="flex flex-col h-full max-w-[500px] w-full bg-grayscale-10">
          <div className="flex-1 p-4 overflow-y-auto mb-10">
      
            {/* 1. 오늘 날짜 */}
            <DateBanner date={new Date()} />

            {/* 2. 채팅 내역  */}
            <div className="px-1">
              {/* 시작 내용 */}
              <div className="flex items-start mb-2 ">
                {/* 챗봇 프로필 사진 */}
                <RookieProfile/>
                <div className="flex-col px-4 space-y-2">
                  {/* 챗봇 이름 */}
                  <p className="text-[14px] font-medium text-black">챗봇 루키</p>

                  {/* 시작 메시지 */}
                  <RookieMessageWithTail messageList={["안녕하세요! 챗봇 루키 입니다.", "궁금하신 정보를 실시간 채팅으로 확인하실 수 있습니다."]}/>

                  {/* 구장 선택 */}
                  {showInitialMessages && (
                    <StadiumSelection 
                      stadiums={stadiumList} 
                      onSelect={handleStadiumSelect} 
                    />
                  )}
                </div>
              </div>

            
              {/* 선택한 구장 */}
              {selectedStadium && (
                <div className="flex justify-end mb-4">
                  <div className="bg-main-5 px-3 py-2 rounded-lg text-grayscale-90 max-w-xs text-xs font-regular">
                    {selectedStadium}
                  </div>
                </div>
              )}
            </div>
          </div>
          

          {/* 3. 채팅 입력창 */}
          <ChatbotInputField />
        </div>
      </div>
    </>
  );
};

export default Chatbot;
