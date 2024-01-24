import React from 'react'
import info from "../images/info.png";

function Info() {
  return (
    <div className="w-full h-full bg-red-40 flex flex-wrap pt-40 justify-center">
      <div className="size-40 bg-yellow-70">
        <img
          src={info}
          alt="info icon"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default Info
