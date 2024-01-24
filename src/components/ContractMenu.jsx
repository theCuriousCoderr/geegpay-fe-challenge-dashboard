import React from "react";
import logo from "../images/logo.png";
import home from "../images/home.png";
import trend_up from "../images/trend_up.png";
import profile from "../images/profile.png";
import box from "../images/box.png";
import discount from "../images/discount.png";
import info from "../images/info.png";
import arrow_right from "../images/arrow_right.png";
import settings from "../images/settings.png";
import logout from "../images/logout.png";

import { useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import HomeIcon from "./HomeIcon";

function ContractMenu({ tab, setTab, theme, setTheme }) {
  let navigate = useNavigate();
  let path = window.location.pathname

  return (
    <div className={`py-1 ${theme === "light" ? "bg-[#F7F8FA] border-[#EBECF2]" : "bg-gray-900 border-slate-800" } transition-all  border-r  h-[90%] flex flex-col justify-between `}>
      <div className="space-y-3">
        <div className="bg-red-70 p-2 w-full h-14 flex items-center justify-center">
          <div className="w-full h-full">
            <img
              src={logo}
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <div
          onClick={() => {
            setTab("home");
            navigate("/");
          }}
          className={`relative bg-red-70 ${theme === "light" ? "hover:bg-[#34CAA5] hover:bg-opacity-10 " : "hover:bg-slate-700" } rounded-lg cursor-pointer w-full h-10 flex items-center justify-center`}
        >
          {path === "/" && (
            <div className={`absolute h-[50%] w-1 rounded-l-md ${theme === "light" ? "bg-[#0D062D]" : "bg-white" }  right-0`}></div>
          )}
          <div className="size-10 bg-red-40 flex items-center justify-center">
            {theme === "light" ? <img src={home} alt="home page icon" className="" /> : <HomeIcon /> }
          </div>

    
        </div>

        {[
          {icon: trend_up, text: "Trend", path: "/trend-up"},
          {icon: profile, text: "Profile", path: "/profile"},
          {icon: box, text: "Box", path: "/box"},
          {icon: discount, text: "Discount", path: "/discount"},
          {icon: info, text: "Info", path: "/info"},
        ].map((items) => {
          return (
            <div
              onClick={() => {
                setTab(items.text.toLowerCase());
                navigate(items.path);
              }}
              className={`relative bg-red-70 ${theme === "light" ? "hover:bg-[#34CAA5] hover:bg-opacity-10 " : "hover:bg-slate-700" } rounded-lg cursor-pointer w-full h-10 flex items-center justify-center`}>
              {path === items.path && (
                <div className={`absolute h-[50%] w-1 rounded-l-md ${theme === "light" ? "bg-[#0D062D]" : "bg-white" }  right-0`}></div>
              )}
              <div className="size-7">
                <img src={items.icon} alt="logout page icon" />
              </div>
            </div>
          );
        })}

        <ThemeToggle theme={theme} setTheme={setTheme} />

      </div>

      <div className="space-y-2">
        {[{ icon: arrow_right }, { icon: settings }, { icon: logout }].map(
          (items) => {
            return (
              <div className="bg-red-70 w-full h-10 flex items-center justify-center">
                <div className="size-7">
                  <img src={items.icon} alt="logout page icon" />
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
}

export default ContractMenu;
