import React from "react";
import Image from "next/image";
import chatbotIcon from "../../../assets/svg/chatbot_lookie.svg";

const ChatbotStart = () => {
  return (
    <div className="flex items-start mb-2 transition-opacity duration-1000">
      <div className="flex items-center justify-center bg-main-40 rounded-md w-11 h-11 mr-2">
        <Image 
          src={chatbotIcon} 
          alt="챗봇 아이콘" 
          width={42} 
          height={41}
        />
      </div>

      <div>
        <p className="text-[14px] font-medium text-black mb-1">챗봇 루키</p>
        <div className="bg-white p-3 rounded-lg text-xs font-regular text-grayscale-90 max-w-xs">
          <p>안녕하세요! 챗봇 루키 입니다.</p>
          <p>궁금하신 정보를 실시간 채팅으로 확인하실 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
};

export default ChatbotStart;
