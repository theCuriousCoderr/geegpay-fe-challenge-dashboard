import React, { useEffect, useState } from 'react'

function StatsSect({theme, icon, text, data, rise, fall, up, down, trend}) {
    let [toggleInfo, setToggleInfo] = useState(false)

    function handleToggleInfo() {
        setToggleInfo(!toggleInfo)
    }
    // useEffect(()= >{

    // }, [])
  return (
    <div className={`w-[48%] xs:max-lg:w-full xs:max-lg:h-52 ${theme === "light" ? "bg-white" : "bg-gray-800" } rounded-xl p-2 border border-[#EDF2F7]`}>
    <div className="bg-red-10 flex items-center justify-between">
      <div className={`size-10 border  border-[#E6E6E6] rounded-full flex items-center justify-center`}>
        <div className="size-6 flex items-center justify-center">
          <img src={icon} alt="total order icon" />
        </div>
      </div>
      <div>
        <div className="w-24 bg-red-40">
        {data.diff === 0 ? <div className='w-full h-full flex items-center justify-center text-blue-600'>- - -</div> : data.diff > 0 ? <img src={rise} alt="rise graph" /> : <img src={fall} alt="fall graph" /> }
        {/* {data.diff > 0 ? <img src={rise} alt="rise graph" /> : <img src={fall} alt="fall graph" /> } */}
        </div>
      </div>
    </div>
    <p className={`font-jarkarta font-medium text-base my-2 ${theme === "light" ? "text-[#898989]" : "text-slate-300" } `}>
      {text}
    </p>
    <p onClick={() => handleToggleInfo() } className={`font-jarkarta font-semibold text-2xl ${theme === "light" ? "text-[#3A3F51]" : "text-slate-200" } `}>
      {toggleInfo ? data.diff : text === "Total Income" ? `$${data.today}` : data.today }
    </p>
    <div className="flex gap-2">
      <div className={`flex items-center justify-center gap-2 p-1 rounded-md ${data.diff === 0 ? "bg-blue-400" : data.diff > 0 ? "bg-[#34CAA5]" : "bg-red-400" } bg-opacity-15`}>
        <div className="size-3 flex items-center justify-center">
        {data.diff === 0 ? "" : data.diff > 0 ? <img src={up} alt="rise trend" /> : <img src={down} alt="down trend" /> }
        </div>
        <p className={`font-jarkarta font-medium text-xs ${data.diff === 0 ? "text-blue-500" : data.diff > 0 ? "text-[#34CAA5]" : "text-red-400" } `}>
          {data.diff === 0 ? "- - -" : data.diff > 0 ? data.diff * (1.00) : data.diff * (-1.00)} %
        </p>
      </div>
      <p className={`font-inter font-normal text-sm ${theme === "light" ? "text-[#606060]" : "text-slate-400" } `}>{`vs previous ${trend}`}</p>
    </div>
  </div>
  )
}

export default StatsSect