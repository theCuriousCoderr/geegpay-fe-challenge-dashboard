import React, { useEffect} from "react";
import profile from "../images/profile.png";

function Profile() {
  useEffect(()=>{
    window.scrollTo(0, 0);
    let title = document.querySelector("title")
    title.innerHTML = "Geegpay FE Challenge Dashboard | Profile"

  }, [])
  return (
    <div className="w-full h-screen bg-red-40 flex flex-wrap pt-40 justify-center">
      <div className="size-40 bg-yellow-70">
        <img
          src={profile}
          alt="profile icon"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Profile;
