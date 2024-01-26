import React from 'react'
import logout from "../images/logout.png";

function LogOut() {
  window.scrollTo(0,0)
  return (
    <div className="w-full h-screen bg-red-40 flex flex-wrap pt-40 justify-center">
    <div className="size-40 bg-yellow-70">
      <img
        src={logout}
        alt="logout icon"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
  )
}

export default LogOut
