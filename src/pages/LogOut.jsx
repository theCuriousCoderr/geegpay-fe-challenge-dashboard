import React, { useEffect} from "react";
import logout from "../images/logout.png";

function LogOut() {
  useEffect(()=>{
    window.scrollTo(0, 0);
    let title = document.querySelector("title")
    title.innerHTML = "Geegpay FE Challenge Dashboard | Logout"

  }, [])
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
  );
}

export default LogOut;
