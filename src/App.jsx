import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import ContractMenu from "./components/ContractMenu";
import ExpandMenu from "./components/ExpandMenu";
import Header from "./components/Header";
import MobileBottomNav from "./components/MobileBottomNav";
import MobileHeader from "./components/MobileHeader";
import expand from "../src/images/expand.png";
import Home from "./pages/Home";
import TrendUp from "./pages/TrendUp";
import NoPage from "./pages/NoPage";
import Profile from "./pages/Profile";
import Box from "./pages/Box";
import Discount from "./pages/Discount";
import Info from "./pages/Info";
import moment from "moment";
import { analytics } from "./utils";
import Settings from "./pages/Settings";
import LogOut from "./pages/LogOut";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import PaddingOutlinedIcon from "@mui/icons-material/PaddingOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function App() {
  const [expandSideNav, setExpandSideNav] = useState(false);
  const [tab, setTab] = useState("home");
  const [theme, setTheme] = useState("");
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    console.log("App refreshed");
    function getTheme() {
      let mediaQueryObj = window.matchMedia("(prefers-color-scheme: light)");
      let isLightMode = mediaQueryObj.matches;
      let currentTheme = isLightMode ? "light" : "dark";
      // alert(currentTheme)
      setTheme(currentTheme);
    }
    theme === "" && getTheme();
  }, [theme]);

  return (
    <div
      className={`relative h-full w-full ${
        theme === "light" ? "bg-white" : "bg-gray-900"
      }  xs:max-lg:pb-20 `}
    >
      <div className="lg:hidden fixed h-10 md:max-lg:h-16 bg-red-30 z-10 w-full bottom-3">
        <MobileBottomNav theme={theme} setTab={setTab} />
      </div>
      <div className="h-full w-full bg-yellow-40 flex">
        <div
          className={`xs:max-lg:hidden relative ${
            expandSideNav ? "w-[10%]" : "w-[5%]"
          } transition-all  h-full ${
            theme === "light" ? "bg-white" : "bg-gray-800"
          }`}
        >
          {!expandSideNav && (
            <ContractMenu
              setExpandSideNav={setExpandSideNav}
              tab={tab}
              setTab={setTab}
              theme={theme}
              setTheme={setTheme}
            />
          )}
          {expandSideNav && (
            <ExpandMenu
              setExpandSideNav={setExpandSideNav}
              tab={tab}
              setTab={setTab}
              theme={theme}
              setTheme={setTheme}
            />
          )}
        </div>
        <div
          className={`w-full h-full  ${
            theme === "light" ? "bg-[#FAFAFA]" : "bg-gray-900"
          } `}
        >
          <div
            className={`h-20 xs:max-lg:flex xs:max-lg:items-center xs:max-lg:w-full border-b ${
              theme === "light"
                ? "border-[#DADDDD]  bg-[#FAFAFA]"
                : "border-slate-800 bg-gray-900"
            }`}
          >
            <Header
              theme={theme}
              showProfile={showProfile}
              setShowProfile={setShowProfile}
            />
            <MobileHeader
              theme={theme}
              setTheme={setTheme}
              showProfile={showProfile}
              setShowProfile={setShowProfile}
            />
          </div>
          <div
            className={`relative w-full h-full ${
              theme === "light" ? "bg-[#FAFAFA]" : "bg-gray-900"
            }`}
          >
            {showProfile && (
              <div
                className={`absolute slideInRig z-20 right-5 p-5 -top-0 ${
                  theme === "light"
                    ? "bg-slate-50"
                    : "bg-gray-800 shadow-slate-40000"
                }  rounded border shadow-md`}
              >
                <div
                  className={` ${
                    theme === "light" ? "text-slate-500" : "text-slate-300"
                  } font-normal space-y-2`}
                >
                  <div>
                    <p
                      className={`font-jarkarta font-semibold text-sm ${
                        theme === "light" ? "text-black" : "text-white"
                      } `}
                    >
                      Ola Lekan
                    </p>
                    <p
                      className={`font-jarkarta font-light text-xs ${
                        theme === "light" ? "text-black" : "text-slate-100"
                      } `}
                    >
                      elijahdimeji549@gmail.com
                    </p>
                  </div>
                  <div
                    className={`flex items-center gap-4 px-3 py-1 rounded-md ${
                      theme === "light"
                        ? "hover:bg-slate-200 "
                        : "hover:bg-gray-700"
                    }`}
                  >
                    <div className="size-3 bg-green-40 flex items-center justify-center">
                      <PermIdentityOutlinedIcon />
                    </div>
                    <p>Your profile</p>
                  </div>
                  <div
                    className={`flex items-center gap-4 px-3 py-1 rounded-md ${
                      theme === "light"
                        ? "hover:bg-slate-200 "
                        : "hover:bg-gray-700"
                    }`}
                  >
                    <div className="size-3 bg-green-40 flex items-center justify-center">
                      <AddOutlinedIcon />
                    </div>
                    <p>Add platform</p>
                  </div>
                  <div
                    className={`flex items-center gap-4 px-3 py-1 rounded-md ${
                      theme === "light"
                        ? "hover:bg-slate-200 "
                        : "hover:bg-gray-700"
                    }`}
                  >
                    <div className="size-3 bg-green-40 flex items-center justify-center">
                      <PaddingOutlinedIcon />
                    </div>
                    <p>Add invoice</p>
                  </div>
                </div>
              </div>
            )}
            <Routes>
              <Route
                path="/"
                element={<Home theme={theme} showProfile={showProfile} />}
              />
              <Route path="/trend-up" element={<TrendUp />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/box" element={<Box />} />
              <Route path="/discount" element={<Discount />} />
              <Route path="/info" element={<Info />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/logout" element={<LogOut />} />
              <Route path="*" element={<NoPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
