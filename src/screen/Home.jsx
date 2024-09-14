import React from "react";
import { useNavigate } from "react-router-dom";
import { TbWorld } from "react-icons/tb";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen">
      <div className="flex flex-col w-full   items-center h-screen  py-3 bg-cover bg-center home">
        <div className="flex justify-between w-full mb-8 md:m-0 px-4  bg-white">
          <div className="flex items-center gap-x-1 flex-1">
            <img
              src="/main_images/nav1.png"
              className="w-14 border-r-2 pr-1 "
            />
            <img src="/main_images/nav3.jpg" className="w-10" />
          </div>
          <div className="flex items-center flex-1   text-green-700 font-bold gap-x-1">
            <TbWorld className="text-2xl" />
            <span>English</span>
          </div>
          <div className="flex-1 justify-end flex items-center">
            <img src="individual 1.png" className="w-14" />
          </div>
        </div>
        <div className="w-full flex items-center justify-center text-center gap-y-3 flex-col">
          <span className="text-lg font-bold text-gray-700">
            أهلآ بكم في ابشر
          </span>
          <span
            className="w-full text-center text-xs pr-3 text-gray-400 font-semibold"
            style={{ fontSize: "12px" }}
          >
            المنصة الإلكترونية لخدمات وزارة الداخلية و قطاعتها , لخدمة المواطنين
            والمقيمين و الزوار
          </span>
        </div>
        <div className="flex md:flex-row-reverse flex-col flex-wrap justify-start mt-8 items-center gap-x-3 flex-1 gap-y-5  ">
          <div
            className=" w-80  cursor-pointer   flex  shadow-2xl flex-row-reverse  items-center rounded-xl "
            onClick={() => navigate("/main")}
          >
            <div className="flex items-center justify-center w-fit p-2   ">
              <img src="individual 1.png" className="h-16 " />
            </div>
            <div className="flex flex-col ">
              <div className="flex flex-col justify-center items-end  my-1 py-5 flex-1 gap-y-1">
                <span className="  font-bold"> أبشر أفراد </span>
                <span className=" text-gray-500  text-right font-bold my-1 text-xs">
                  خدمات المواطنين والمقيمين و الزوار
                </span>
              </div>
            </div>
          </div>
          <div
            className=" cursor-pointer w-80   flex  shadow-2xl flex-row-reverse  items-center rounded-xl "
            onClick={() => navigate("/main")}
          >
            <div className="flex items-center justify-center w-fit p-2   ">
              <img src="individual 2.png" className="h-16 " />
            </div>
            <div className="flex flex-col ">
              <div className="flex flex-col justify-center items-end  my-1 py-5 flex-1 gap-y-1">
                <span className="  font-bold"> أبشر أعمال </span>
                <span className=" text-gray-500  text-right font-bold my-1 text-xs">
                  خدمات المنشاْت اصحاب الأعمال
                </span>
              </div>
            </div>
          </div>
          <div
            className=" cursor-pointer w-80   flex  shadow-2xl flex-row-reverse  items-center rounded-xl "
            onClick={() => navigate("/main")}
          >
            <div className="flex items-center justify-center w-fit p-2   ">
              <img src="individual 3.png" className="h-16 " />
            </div>
            <div className="flex flex-col ">
              <div className="flex flex-col justify-center items-end  my-1 py-5 flex-1 gap-y-1">
                <span className="  font-bold"> أبشر حكومة </span>
                <span className=" text-gray-500  text-right font-bold my-1 text-xs">
                  خدمات منسوبي القطاع الحكومي
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
