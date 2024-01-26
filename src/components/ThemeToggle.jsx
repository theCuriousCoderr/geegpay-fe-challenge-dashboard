import React from "react";
import sun from "../images/sun.png";
import moon from "../images/moon.png";

function ThemeToggle({ theme, setTheme }) {
  return (
    <div className={`cursor-pointer relative ${theme === "light" ? "bg-white" : "bg-gray-700" }  w-10 mx-auto h-24 rounded-t-full rounded-b-full p-2 flex justify-center`}>
      <div
        className={`absolute ${
          theme === "light" ? "top-2 bg-[#34CAA5]" : "bottom-2 bg-[#34CAA5]"
        }  transition-all size-7 z-10 rounded-full  `}
      ></div>
      <div className="relative w-full h-full bg-slate-10 rounded-full flex flex-col justify-between items-center z-10">
        <div
          onClick={() => {
            setTheme("light");
          }}
          className={`size-7 rounded-full ${
            theme == "light" ? "bg-red-80 " : "bg-slate-700 hover:bg-gray-500"
          }  flex justify-center items-center p-1`}
        >
          <div className="size-5 bg-red-90 rounded-full">
            <img
              src={sun}
              alt="light mode"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div
          onClick={() => {
            setTheme("dark");
          }}
          className={`relative z-20 size-7 rounded-full ${
            theme == "dark" ? "bg-transparent" : "bg-transparent hover:bg-gray-500"
          }  flex justify-center items-center p-1`}
        >
          <div className="size-5 bg-red-90 rounded-full">
            <img
              src={moon}
              alt="dark mode"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThemeToggle;
