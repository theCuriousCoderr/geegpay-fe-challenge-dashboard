import React from "react";
import search from "../images/search.png";
import ola from "../images/ola.jfif";
import date from "../images/date.png";
import alert from "../images/alert.png";
import arrow_down from "../images/arrow_down.png";
import moment from "moment";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

function Header({ theme, showProfile, setShowProfile }) {
  return (
    <div
      className={`xs:max-lg:hidden ${
        theme === "light" ? "bg-white" : "bg-gray-900"
      } h-full flex p-3 justify-between bg-red-80`}
    >
      <p
        className={` ${
          theme === "light"
            ? "bg-white text-[#26282C]"
            : "bg-gray-900 text-white"
        } font-jarkart w-[15%] font-semibold  text-2xl flex items-center justify-center`}
      >
        Dashboard
      </p>
      <div
        className={`flex items-cente justify-betwee gap-5  ${
          theme === "light" ? "bg-[#FAFAFA]" : "bg-gray-900"
        } `}
      >
        <div className="relative w-72 p-1 cursor-pointer">
          <div className="absolute top-0 left-0 h-full aspect-square bg-red-40 flex items-center justify-center">
            <div className="size-4">
              <img src={search} alt="search icon" />
            </div>
          </div>
          <input
            type="search"
            placeholder="Search..."
            className={`cursor-pointer bg-transparent w-full h-full rounded-full border border-[#DADDDD] pl-10 pr-3 py-2 placeholder:font-inter placeholder:font-normal placeholder:text-[#A3A3A3] ${
              theme !== "light" && "text-white"
            } `}
          />
        </div>
        <div className="w-64 bg-yellow-40 cursor-pointer flex items-center">
          <div className="w-[80%] flex items-center bg-blue-60">
            <div className="w-[20%] h-full bg-red-40 flex items-center justify-center">
              <div className="size-5 bg-red-70 flex items-center justify-center text-white rounded-full">
                {theme === "light" ? (
                  <img src={date} alt="calendar icon" />
                ) : (
                  <CalendarMonthOutlinedIcon />
                )}
              </div>
            </div>
            <p
              className={`w-[80%] bg-red-60 font-inter font-medium ${
                theme === "light" ? "text-[#26282C]" : "text-gray-300"
              } `}
            >
              {moment().format("LL")}{" "}
            </p>
          </div>
          <div className="w-[20%] flex items-center justify-center bg-red-40 ">
            <div className="size-10 rounded-full border border-[#DADDDD] flex items-center justify-center  ">
              <div className="size-5 flex items-center justify-center text-white">
                {theme === "light" ? (
                  <img src={alert} alt="notifications icon" />
                ) : (
                  <NotificationsOutlinedIcon />
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={() => setShowProfile(!showProfile)}
          className="cursor-pointer w-52 bg-whit rounded-full border border-[#DADDDD] p-1 flex items-center flex-wrap bg-red-30"
        >
          <div className="h-full aspect-square bg-red-300 rounded-full flex items-center justify-center">
            <div className="size-full flex items-center justify-center">
              <img
                src={ola}
                alt="user image"
                className={`h-full w-full object-cover rounded-full ${
                  theme !== "light" && "border-2 border-slate-200"
                }`}
              />
            </div>
          </div>
          <div className="bg-red-40 flex flex-col justify-center h-full w-[60%] ml-2 pr-2">
            <p
              className={`font-inter font-normal text-xs text-right ${
                theme === "light" ? "text-[#26282C]" : "text-slate-300"
              } `}
            >
              Ola Lekan
            </p>
            <p
              className={`font-inter font-xs truncate text-ellipsis text-sm text-right  ${
                theme === "light" ? "text-[#787486]" : "text-slate-200"
              }`}
            >
              elijahdimeji549@gmail.com
            </p>
          </div>
          <div className="w-[10%] bg-red-40 flex items-center justify-center">
            <div
              className={`size-5 flex items-center justify-center text-white transition-all ${
                !showProfile ? "rotate-0" : "rotate-180"
              }`}
            >
              {theme === "light" ? (
                <img src={arrow_down} alt="expand profile." />
              ) : (
                <KeyboardArrowDownOutlinedIcon />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
