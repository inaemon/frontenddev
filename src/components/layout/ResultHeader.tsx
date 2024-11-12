import Image from 'next/image';

import shareButtonGrayIcon from '../../assets/webp/share_gray.webp';

const Bar = () => {
    return (
        <div className="flex justify-between w-full border-b border-grayscale-10 p-[15px]">
            <div className="flex justify-center items-center w-full">
                <p className="text-lg text-grayscale-90 font-semibold text-center ">
                    야구장 유형 테스트 결과
                </p>
            </div>
            <Image src={shareButtonGrayIcon} alt="공유 버튼" width={28} height={24} className="cursor-pointer"/>
        </div>
    )
}


export default Bar