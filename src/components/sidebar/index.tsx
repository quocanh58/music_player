import React, { useEffect, useState } from "react";
import "./sidebar.css";
import SidebarButton from "./sidebarButton";
import { MdFavorite, MdSpaceDashboard } from "react-icons/md";
import { FaGripfire, FaPlay, FaSignOutAlt } from "react-icons/fa";
import { IoLibrary } from "react-icons/io5";
import apiClient from "../../spotify";

export default function Sidebar() {
  const [image, setImage] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8iN1_rPas2d_5uAfnmT5g4q7GFVDeljE26IJx-HzRlInaQdhjaZwFAJkBrz6Ft7ukZxE&usqp=CAU"
  );

  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    apiClient.get("me").then((response) => {
      setDisplayName(response.data.display_name);
      console.log(response.data.display_name);
      setImage(response.data.images[0].url);
    });
  }, []);
  return (
    <div className="sidebar-container">
      <div className="sidebar-header">
        <img src={image} className="profile-img" alt="profile" />
        <h5>
          Hi, <strong>{displayName}</strong>
        </h5>
      </div>
      <div>
        <SidebarButton title="Feed" to="/feed" icon={<MdSpaceDashboard />} />
        <SidebarButton title="Trending" to="/trending" icon={<FaGripfire />} />
        <SidebarButton title="Player" to="/player" icon={<FaPlay />} />
        <SidebarButton
          title="Favorites"
          to="/favorites"
          icon={<MdFavorite />}
        />
        <SidebarButton title="Library" to="/library" icon={<IoLibrary />} />
      </div>
      <div className="sidebar-footer">
        <SidebarButton title="Sign Out" to="/" icon={<FaSignOutAlt />} />
      </div>
    </div>
  );
}
