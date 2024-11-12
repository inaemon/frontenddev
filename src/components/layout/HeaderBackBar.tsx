import Image from 'next/image';

import backLeftButtonGrayIcon from '../../assets/webp/back_left_button_gray.webp';
import closeButtonGrayIcon from '../../assets/webp/close_button_gray.webp';


interface Props {
    stadium: string;
    prevEvent: () => void;
    closeEvent: () => void;
}

const Bar = ({stadium, prevEvent, closeEvent}: Props) => {
    return (
        <div className="flex justify-between w-full border-b border-grayscale-10 p-[15px]">
            <Image src={backLeftButtonGrayIcon} alt="뒤로가기 버튼" width={24} height={24} onClick={prevEvent} className="cursor-pointer"/>
            <div className="flex justify-center items-center w-full">
                <p className="text-lg text-grayscale-90 font-semibold text-center ">
                    내가 갈 곳은? {stadium}
                </p>
            </div>
            <Image src={closeButtonGrayIcon} alt="닫기 버튼" width={24} height={24} onClick={closeEvent} className="cursor-pointer"/>
        </div>
    )
}


export default Bar