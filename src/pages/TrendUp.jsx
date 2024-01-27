import React, { useEffect} from "react";
import trend_up from "../images/trend_up.png";

function TrendUp() {
  useEffect(()=>{
    window.scrollTo(0, 0);
    let title = document.querySelector("title")
    title.innerHTML = "Geegpay FE Challenge Dashboard | Trend"

  }, [])
  return (
    <div className="w-full h-screen bg-red-40 flex flex-wrap pt-40 justify-center">
      <div className="size-40 bg-yellow-70">
        <img
          src={trend_up}
          alt="trend icon"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default TrendUp;
