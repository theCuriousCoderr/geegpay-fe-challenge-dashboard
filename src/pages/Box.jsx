import React, { useEffect } from "react";
import box from "../images/box.png";

function Box() {
  useEffect(()=>{
    window.scrollTo(0, 0);
    let title = document.querySelector("title")
    title.innerHTML = "Geegpay FE Challenge Dashboard | Box"

  }, [])
  
  return (
    <div className="w-full h-screen bg-red-40 flex flex-wrap pt-40 justify-center">
      <div className="size-40 bg-yellow-70">
        <img src={box} alt="box icon" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default Box;
