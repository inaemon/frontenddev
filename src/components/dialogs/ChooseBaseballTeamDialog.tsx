
import Image from 'next/image';

import closeButtonGrayIcon from '@/src/assets/webp/close_button_gray.webp';

import { teamsReservationData } from "@/src/constants/ReservationData";

interface Props {
    onClose: () => void;
}

const Dialog = ({onClose}: Props) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 w-full">
            <div className="flex flex-col bg-white border border-0 rounded-[12px] w-[324px]">
                {/** 헤더 */}
                <div className="flex justify-between w-full p-[20px]">
                    <div className="flex justify-start items-center w-full">
                        <p className="text-md text-grayscale-90 font-bold">
                            어느 구단의 예매처를 원하시나요?
                        </p>
                    </div>
                    <Image src={closeButtonGrayIcon} alt="닫기 버튼" className="w-[24px] h-[24px] cursor-pointer" onClick={onClose}/>
                </div>

                {/** 좌석 */}
                <div className="flex flex-col justify-start px-[20px] gap-[12px] pb-[20px]">
                    {teamsReservationData.map((team, index) => (
                        <div key={index} className="justify-center items-center text-center bg-grayscale-5 border border-0 rounded-[4px] py-[7px]">
                            <a href={team.url} target="_blank" rel="noopener noreferrer">
                                <p className="text-xs text-grayscale-90 font-regular">
                                    {team.name}
                                </p>
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default Dialog