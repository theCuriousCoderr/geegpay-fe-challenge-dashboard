import React, { useEffect, useState } from "react";

function StatsSect({ theme, icon, text, data, rise, fall, up, down, trend }) {
  let [toggleInfo, setToggleInfo] = useState(false);

  function handleToggleInfo() {
    setToggleInfo(!toggleInfo);
  }

  return (
    <div
      className={`w-[48%] flex flex-col items-start justify-between bg-red-40 xs:max-lg:w-[49%] md:max-lg:w-[45%] md:max-lg:mx-auto xs:max-lg:space-y-3 xs:max-md:space-y-1 xs:max-lg:p-3 xs:max-lg:h-auto xs:max-lg:my-2 border border-[#EDF2F7] ${
        theme === "light"
          ? "bg-white hover:bg-slate-100"
          : "bg-gray-800 hover:bg-gray-700"
      } rounded-xl p-2 border border-[#EDF2F7]`}
    >
      <div className="bg-red-10 w-full flex xs:max-md:flex-col xs:max-md:gap-5 items-center justify-between">
        <div
          className={`size-10 border  border-[#E6E6E6] rounded-full flex items-center justify-center`}
        >
          <div className="size-6 flex items-center justify-center">
            <img src={icon} alt="total order icon" />
          </div>
        </div>
        <div>
          <div className="w-24 bg-red-40 xs:max-md:mx-auto">
            {data.diff === 0 ? (
              <div className="w-full h-full flex items-center justify-center text-blue-600">
                - - -
              </div>
            ) : data.diff > 0 ? (
              <img src={rise} alt="rise graph" />
            ) : (
              <img src={fall} alt="fall graph" />
            )}
            {/* {data.diff > 0 ? <img src={rise} alt="rise graph" /> : <img src={fall} alt="fall graph" /> } */}
          </div>
        </div>
      </div>
      <p
        className={`font-jarkarta font-medium text-base my-2  ${
          theme === "light" ? "text-[#898989]" : "text-slate-300"
        } `}
      >
        {text}
      </p>
      <p
        onClick={() => handleToggleInfo()}
        className={`cursor-pointer w-full font-jarkarta font-semibold text-xl xs:max-md:text-lg ${
          theme === "light" ? "text-[#3A3F51]" : "text-slate-200"
        } `}
      >
        {toggleInfo
          ? data.diff
          : text === "Total Income"
          ? `$${data.today}`
          : data.today}
      </p>
      <div className="flex items-center xs:max-md:flex-col xs:max-md:w-full gap-2 bg-red-40">
        <div
          className={`flex xs:max-md:w-auto items-center justify-center gap-2 p-1 rounded-md ${
            data.diff === 0
              ? "bg-blue-400"
              : data.diff > 0
              ? "bg-[#34CAA5]"
              : "bg-red-400"
          } bg-opacity-15`}
        >
          <div className="size-2 flex items-center justify-center">
            {data.diff === 0 ? (
              ""
            ) : data.diff > 0 ? (
              <img src={up} alt="rise trend" />
            ) : (
              <img src={down} alt="down trend" />
            )}
          </div>
          <p
            className={`font-jarkarta font-medium text-xs ${
              data.diff === 0
                ? "text-blue-500"
                : data.diff > 0
                ? "text-[#34CAA5]"
                : "text-red-400"
            } `}
          >
            {data.diff === 0
              ? "- - -"
              : data.diff > 0
              ? data.diff * 1.0
              : data.diff * -1.0}{" "}
            %
          </p>
        </div>
        <p
          className={`font-inter font-normal text-xs xs:max-md:text-xs xs:max-md:text-right xs:max-md:text-[#606060] ${
            theme === "light" ? "text-[#606060]" : "text-slate-400"
          } `}
        >{`vs previous ${trend}`}</p>
      </div>
    </div>
  );
}

export default StatsSect;
