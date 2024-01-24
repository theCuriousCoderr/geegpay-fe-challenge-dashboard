import React from 'react'
import profile from "../images/profile.png";

function Profile() {
  return (
    <div className="w-full h-full bg-red-40 flex flex-wrap pt-40 justify-center">
      <div className="size-40 bg-yellow-70">
        <img
          src={profile}
          alt="profile icon"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default Profile
