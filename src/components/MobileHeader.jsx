import React from "react";
import logo from "../images/logo.png";
import ThemeToggle from "./ThemeToggle";
import sun from "../images/sun.png";
import moon from "../images/moon.png";

function MobileHeader({ theme, setTheme }) {
  return (
    <div className="lg:hidden bg-red-30 p-2 flex justify-between">
      <div className="size-10 bg-red-90">
        <div>
          <img src={logo} alt="logo" />
        </div>
      </div>

      <div className="w-1/2 bg-red-90 flex items-center justify-center">
        <div className="size-8 bg-red-40">
          {theme === "light" ? (
            <div onClick={() => setTheme("dark")} className="bg-[#34CAA5] p-1 rounded-full">
              <img src={sun} alt="light mode button" />{" "}
            </div>
          ) : (
            <div onClick={() => setTheme("light")} className="bg-slate-900 p-1 rounded-full">
              {" "}
              <img src={moon} alt="dark mode button" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileHeader;
