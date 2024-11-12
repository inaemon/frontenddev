import Image from 'next/image';

import closeButtonGrayIcon from '../../assets/webp/close_button_gray.webp';


interface Props {
    stadium: string;
    closeEvent: () => void;
}

const Bar = ({stadium, closeEvent}: Props) => {
    return (
        <div className="flex justify-between w-full border-b border-grayscale-10 p-[15px]">
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