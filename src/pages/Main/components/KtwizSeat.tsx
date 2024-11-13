"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { StaticImageData } from "next/image";
import defaultStadium from "../../../assets/webp/seat/kt_default.webp";
import cheerSeat from "../../../assets/webp/seat/kt_cheer.webp";
import skySeat from "../../../assets/webp/seat/kt_sky.webp";
import skyZoneSeat from "../../../assets/webp/seat/kt_skyzone.webp";
import kidsLandSeat from "../../../assets/webp/seat/kt_kidsland.webp";
import centralSeat from "../../../assets/webp/seat/kt_central.webp";
import genieTvSeat from "../../../assets/webp/seat/kt_genietv.webp";
import yboxSeat from "../../../assets/webp/seat/kt_ybox.webp";
import alphaShoppingSeat from "../../../assets/webp/seat/kt_alphashopping.webp";
import genieZoneSeat from "../../../assets/webp/seat/kt_geniezone.webp";
import excitingSeat from "../../../assets/webp/seat/kt_exciting.webp";
import outfieldSeat from "../../../assets/webp/seat/kt_outfield.webp";
import tvingSeat from "../../../assets/webp/seat/kt_tving.webp";

// 각 색상별 이미지와 오차값 포함
const colorMap: { [key: string]: { image: StaticImageData; tolerance: number } } = {
  "#B23039": { image: cheerSeat, tolerance: 5 },        // 빨간색 좌석: cheerSeat
  "#65C5DE": { image: skySeat, tolerance: 15 },         // 하늘색 좌석: skySeat
  "#292F46": { image: skyZoneSeat, tolerance: 25 },     // 남색 좌석: skyZoneSeat
  "#008FD7": { image: kidsLandSeat, tolerance: 25 },    // 파랑 좌석: kidsLandSeat
  "#5E346E": { image: centralSeat, tolerance: 25 },     // 보라색 좌석: centralSeat
  "#599741": { image: genieTvSeat, tolerance: 15 },     // 녹색 좌석: genieTvSeat
  "#F5A545": { image: yboxSeat, tolerance: 15 },        // 주황색 좌석: yboxSeat
  "#E95560": { image: alphaShoppingSeat, tolerance: 15 }, // 핑크 좌석: alphaShoppingSeat
  "#35659E": { image: genieZoneSeat, tolerance: 10 },    // 짙은 파랑 좌석: genieZoneSeat
  "#3EA6A5": { image: excitingSeat, tolerance: 25 },     // 민트 좌석: excitingSeat
  "#CEDA82": { image: outfieldSeat, tolerance: 25 },     // 연노랑 좌석: outfieldSeat
  "#E3A3B1": { image: tvingSeat, tolerance: 10 },        // 연분홍 좌석: tvingSeat
};

// HEX 색상을 RGB로 변환하는 함수
const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
};

// 특정 색상이 목표 색상에 가까운지 판별
const isColorClose = (
  r: number,
  g: number,
  b: number,
  targetColor: { r: number; g: number; b: number },
  tolerance: number
) => {
  return (
    Math.abs(r - targetColor.r) <= tolerance &&
    Math.abs(g - targetColor.g) <= tolerance &&
    Math.abs(b - targetColor.b) <= tolerance
  );
};

const KtwizSeat = () => {
  const [seatImage, setSeatImage] = useState<StaticImageData>(defaultStadium);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const loadImageToCanvas = useCallback(() => {
    const image: HTMLImageElement = document.createElement("img");
    image.src = seatImage.src;
    image.onload = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        const scale = window.devicePixelRatio || 1; // 화면 배율에 따라 픽셀 밀도 조절

        const canvasWidth = 398;
        const canvasHeight = 434;
        canvas.width = canvasWidth * scale;
        canvas.height = canvasHeight * scale;

        canvas.style.width = "100%";
        canvas.style.height = "auto";

        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.scale(scale, scale);
          ctx.clearRect(0, 0, canvasWidth, canvasHeight);
          ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);
          setIsImageLoaded(true);
        }
      }
    };
  }, [seatImage]);

  useEffect(() => {
    loadImageToCanvas();
  }, [loadImageToCanvas]);

  useEffect(() => {
    // 캔버스 외부를 클릭했을 때 기본 이미지로 되돌리는 핸들러
    const handleOutsideClick = (event: MouseEvent) => {
      if (canvasRef.current && !canvasRef.current.contains(event.target as Node)) {
        setSeatImage(defaultStadium);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    event.stopPropagation(); // 이벤트 버블링 방지
    if (!isImageLoaded) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();

      // 터치 이벤트인지 확인하여 좌표 계산
      const x = "clientX" in event ? event.clientX - rect.left : event.touches[0].clientX - rect.left;
      const y = "clientY" in event ? event.clientY - rect.top : event.touches[0].clientY - rect.top;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        const scale = window.devicePixelRatio || 1;
        const pixelData = ctx.getImageData(x * scale, y * scale, 1, 1).data;
        const [r, g, b] = [pixelData[0], pixelData[1], pixelData[2]];

        // 클릭한 색상에 따라 해당 좌석 이미지로 변경
        let matchedImage = defaultStadium;
        Object.keys(colorMap).forEach((hex) => {
          const { image, tolerance } = colorMap[hex];
          const targetColor = hexToRgb(hex);
          if (isColorClose(r, g, b, targetColor, tolerance)) {
            matchedImage = image;
          }
        });
        setSeatImage(matchedImage);
      }
    }
  };

  return (
    <div className="flex justify-center" onClick={() => setSeatImage(defaultStadium)}>
      <canvas
        ref={canvasRef}
        className="max-w-[398px] w-full mx-auto"
        onClick={handleCanvasClick}
        onTouchStart={handleCanvasClick} // 터치 이벤트 추가
      />
    </div>
  );
};

export default KtwizSeat;
