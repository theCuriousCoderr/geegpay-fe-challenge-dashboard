import React from "react";

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
import HomeIcon from "./HomeIcon";

function MobileBottomNav({ theme, setTab }) {
  let navigate = useNavigate();
  let path = window.location.pathname;
  return (
    <div
      className={`${
        theme === "light" ? "bg-gray-900" : "bg-white"
      } flex justify-between`}
    >
      {[
        { icon: home, text: "Home", path: "/" },
        { icon: trend_up, text: "Trend", path: "/trend-up" },
        { icon: profile, text: "Profile", path: "/profile" },
        { icon: box, text: "Box", path: "/box" },
        { icon: discount, text: "Discount", path: "/discount" },
        { icon: info, text: "Info", path: "/info" },
      ].map((items) => {
        return (
          <div
            onClick={() => {
              setTab(items.text.toLowerCase());
              navigate(items.path);
            }}
            className="relative bg-red-10 w-[15%] h-14 pt flex flex-col gap-1 items-center justify-center "
          >
            {path === items.path && (
              <div
                className={`absolute w-1/3 ${
                  theme === "light" ? "bg-white" : "bg-[#0D062D]"
                }  h-1 top-0 rounded-b-lg`}
              ></div>
            )}
            <div className="w-full bg-red-40 flex items-center justify-center">
              <div className="size-5">
                {items.text === "Home" ? (
                  theme === "light" ? (
                    <HomeIcon />
                  ) : (
                    <img
                      src={items.icon}
                      alt={`${items.text} icon`}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <img
                    src={items.icon}
                    alt={`${items.text} icon`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
            <div className="w-full flex items-center justify-center bg-red-40">
              <p
                className={`font-jarkarta font-light text-xs  ${
                  theme === "light" ? "text-slate-300" : "text-slate-900"
                } `}
              >
                {items.text}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MobileBottomNav;
