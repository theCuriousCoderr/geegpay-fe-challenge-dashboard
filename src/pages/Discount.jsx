import React from 'react'
import discount from "../images/discount.png";

function Discount() {
  return (
    <div className="w-full h-screen bg-red-40 flex flex-wrap pt-40 justify-center">
      <div className="size-40 bg-yellow-70">
        <img
          src={discount}
          alt="discount icon"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default Discount
