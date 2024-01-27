import React from "react";
import logo from "../images/logo.png";
import ThemeToggle from "./ThemeToggle";
import sun from "../images/sun.png";
import search from "../images/search.png";
import moon from "../images/moon.png";
import { useNavigate } from "react-router-dom";
import { Menu } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";

function MobileHeader({ theme, setTheme, showProfile, setShowProfile }) {
  let navigate = useNavigate();
  return (
    <div className="lg:hidden bg-red-30 p-2 flex justify-between">
      <div
        onClick={() => navigate("/")}
        className="w-[20%] flex items-center justify-center bg-red-40"
      >
        <div className="size-10 bg-red-90">
          <div>
            <img src={logo} alt="logo" />
          </div>
        </div>
      </div>

      <div className="w-[80%] bg-red-90 flex justify-end items-center gap-2">
        <div className="relative w-40  p-1">
          <div className="absolute top-0 left-0 h-full aspect-square bg-red-40 flex items-center justify-center">
            <div className="size-4">
              <img src={search} alt="search icon" />
            </div>
          </div>
          <input
            type="search"
            placeholder="Search..."
            className="bg-transparent w-full h-full rounded-full border border-[#DADDDD] pl-10 pr-3 py-2 placeholder:font-inter placeholder:font-normal placeholder:text-[#A3A3A3] "
          />
        </div>
        <div className="size-8 bg-red-40">
          {theme === "light" ? (
            <div
              onClick={() => setTheme("dark")}
              className="bg-gray-900 p-1 rounded-full"
            >
              <img src={moon} alt="dark mode button" />
            </div>
          ) : (
            <div
              onClick={() => setTheme("light")}
              className="bg-[#34CAA5] p-1 rounded-full"
            >
              <img src={sun} alt="light mode button" />{" "}
            </div>
          )}
        </div>
        <div
          onClick={() => setShowProfile(!showProfile)}
          className={`size-8 flex items-center justify-center ${
            theme === "light"
              ? "bg-slate-700 text-white rounded-lg"
              : "bg-gray-100 rounded-lg"
          } `}
        >
          {!showProfile ? <MenuOutlinedIcon /> : <CloseIcon />}
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
