import React, { useState } from "react";
import Header from "../../components/layout/MainHeader";
import NavBar from "../../components/layout/NavBar";
import Tabs from "./components/Tabs";
import dummyData from "../../constants/CultureData";
import CategoryHeader from "./components/CategoryHeader";
import CategoryRow from "./components/CategoryRow";

type CategoryType = "먹거리" | "즐길거리";
type CategoryKeyType = "내부" | "외부";

// "먹거리" 데이터 타입
type FoodType = {
  title: string;
  location: string;
  menu: string;
  price: string;
  description: string;
  image: string;
};

// "즐길거리" 데이터 타입
type ActivityType = {
  title: string;
  description: string;
  image: string;
};

// 내부 데이터 타입
type InternalData = {
  식사류: FoodType[];
  후식류: FoodType[];
};

// 외부 데이터 타입
type ExternalData = FoodType[] | ActivityType[];

const Culture = () => {
  const [selectedTab, setSelectedTab] = useState<CategoryType>("먹거리");

  const isInternalData = (data: unknown): data is InternalData => {
    return (
      typeof data === "object" &&
      data !== null &&
      "식사류" in data &&
      "후식류" in data
    );
  };

  const isActivityData = (data: unknown): data is ActivityType[] => {
    return (
      Array.isArray(data) &&
      data.length > 0 &&
      "description" in data[0] &&
      "image" in data[0]
    );
  };

  const renderCategory = (category: CategoryKeyType) => {
    const data = dummyData[selectedTab][category];

    if (isInternalData(data) && selectedTab === "먹거리" && category === "내부") {
      return (
        <>
          <CategoryHeader title={`구장 ${category}`} level={1} />
          <CategoryHeader title="식사류" level={2} showButton />
          <CategoryRow data={data.식사류} isActivity={false} />
          <CategoryHeader title="후식류" level={2} showButton />
          <CategoryRow data={data.후식류} isActivity={false} />
        </>
      );
    }

    if ((selectedTab === "먹거리" || selectedTab === "즐길거리") && Array.isArray(data)) {
      return (
        <>
          <CategoryHeader title={`구장 ${category}`} level={1} />
          <CategoryRow
            data={data}
            isActivity={selectedTab === "즐길거리"}
          />
        </>
      );
    }

    return null;
  };

  return (
    <div className="flex flex-col bg-grayscale-5 h-screen overflow-auto scrollbar-hide pb-20">
      <div className="sticky top-0 z-10 bg-white">
        <Header />
      </div>
      <div className="flex-1 p-6 overflow-y-auto">
        <Tabs selectedTab={selectedTab} onSelectTab={setSelectedTab} />
        {renderCategory("내부")}
        {renderCategory("외부")}
      </div>
      <NavBar />
    </div>
  );
};

export default Culture;
