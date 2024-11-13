import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import chatbotIcon from "../../assets/svg/chatbot_floating_button.svg";

const FloatingChatbotButton = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/chatbot"); 
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-[78px] right-4 md:right-[calc(50%-250px)] flex items-center justify-center transition ease-in-out bg-main-10 rounded-full w-12 h-12 shadow-2xl"
      aria-label="히트존 챗봇"
    >
      <Image 
        src={chatbotIcon} 
        alt="히트존 챗봇" 
        width={24} 
        height={24}
      />
    </button>
  );
};

export default FloatingChatbotButton;
