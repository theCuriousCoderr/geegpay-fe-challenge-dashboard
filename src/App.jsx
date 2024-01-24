import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import ContractMenu from './components/ContractMenu'
import ExpandMenu from './components/ExpandMenu'
import Header from './components/Header'
import MobileBottomNav from './components/MobileBottomNav'
import MobileHeader from './components/MobileHeader'
import expand from '../src/images/expand.png'
import Home from './pages/Home'
import TrendUp from './pages/TrendUp'
import NoPage from './pages/NoPage'
import Profile from './pages/Profile'
import Box from './pages/Box'
import Discount from './pages/Discount'
import Info from './pages/Info'
import moment from 'moment'



function App() {
  const [expandSideNav, setExpandSideNav ] = useState(false)
  const [tab, setTab] = useState("home")
const [theme, setTheme] = useState("light")

let test = moment("2024-02-24T18:55:22.216Z").dayOfYear()
// alert(test)
  return (
   <div className='fixed h-full w-full bg-white p- xs:max-lg:p-0 '>
    <div className='lg:hidden fixed h-10 bg-red-30 z-10 w-full bottom-3'>
      <MobileBottomNav setTab={setTab} />
    </div>
    <div className='h-full w-full bg-yellow-40 flex'>
      <div className={`xs:max-lg:hidden relative ${expandSideNav ? "w-[10%]" : "w-[5%]" } transition-all  h-full ${theme === "light" ? "bg-white" : "bg-gray-800" }`}>
        <div onClick={()=> {setExpandSideNav(!expandSideNav)}} className=' absolute size-5 rounded-full -right-4 top-5 border-2 flex items-center justify-center'>
          <div className={`size-2 flex items-center justify-center ${expandSideNav ? "rotate-90" : "-rotate-90"}`}>
          <img src={expand} alt="expand arrow" className='w-full h-full object-cover' />
          </div>
        </div>
        {!expandSideNav && <ContractMenu tab={tab} setTab={setTab} theme={theme} setTheme={setTheme} /> }
        {expandSideNav && <ExpandMenu tab={tab} setTab={setTab} theme={theme} setTheme={setTheme} /> }
      </div>
      <div className={`w-full h-full  ${theme === "light" ? "bg-[#FAFAFA]" : "bg-gray-900" } `}>
        <div className={`h-16 border-b ${theme === "light" ? "border-[#DADDDD]  bg-[#FAFAFA]" : "border-slate-800 bg-gray-900" }`}>
          <Header theme={theme} />
          <MobileHeader theme={theme} setTheme={setTheme} />
        </div>
        <div className={`relative w-full h-full ${theme === "light" ? "bg-white" : "bg-gray-900" }`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trend-up" element={<TrendUp />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/box" element={<Box />} />
            <Route path="/discount" element={<Discount />} />
            <Route path="/info" element={<Info />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </div>

    </div>

   </div>
  )
}

export default App
