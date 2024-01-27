import React from "react";
import box from "../images/box.png";

function Box() {
  window.scrollTo(0, 0);
  return (
    <div className="w-full h-screen bg-red-40 flex flex-wrap pt-40 justify-center">
      <div className="size-40 bg-yellow-70">
        <img src={box} alt="box icon" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default Box;
