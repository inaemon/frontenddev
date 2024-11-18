import Image from 'next/image';

import backLeftButtonGrayIcon from '@/src/assets/webp/back_left_button_gray.webp';
import closeButtonGrayIcon from '@/src/assets/webp/close_button_gray.webp';

import { useScreenWidth } from "@/src/hooks/useReaction";

interface Props {
    stadium: string;
    prevEvent: () => void;
    closeEvent: () => void;
}

const Bar = ({stadium, prevEvent, closeEvent}: Props) => {
    const { isSmall, isMedium, isLarge, isExtraLarge } = useScreenWidth();

    const textSize = isSmall
        ? "text-sm"
        : isMedium
        ? "text-lg"
        : isLarge
        ? "text-lg"
        : "text-lg";
    
    return (
        <div className="flex justify-between w-full border-b border-grayscale-10 p-[15px]">
            <Image src={backLeftButtonGrayIcon} alt="뒤로가기 버튼" width={24} height={24} onClick={prevEvent} className="cursor-pointer"/>
            <div className="flex justify-center items-center w-full">
                <p className={`${textSize} text-grayscale-90 font-semibold text-center`}>
                    내가 갈 곳은? {stadium}
                </p>
            </div>
            <Image src={closeButtonGrayIcon} alt="닫기 버튼" width={24} height={24} onClick={closeEvent} className="cursor-pointer"/>
        </div>
    )
}


export default Bar