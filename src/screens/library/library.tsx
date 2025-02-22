import React, { useEffect, useState } from "react";
import APIKit from "../../spotify";
import "./library.css";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Library() {
  const [playlists, setPlaylists] = useState<any[]>([]);

  useEffect(() => {
    APIKit.get("me/playlists").then((response) => {
      const playlists = response.data.items || []; // Tránh lỗi nếu items null
      setPlaylists(playlists);
      console.log(playlists);
    });
  }, []);

  const navigate = useNavigate();

  const playPlayList = (playlistId: string) => {
    navigate("/player", { state: { id: playlistId } });
  };

  return (
    <div className="screen-container">
      <div className="library-body">
        {playlists.map((playlist) => {
          const imageUrl =
            playlist?.images?.length > 0
              ? playlist.images[0].url
              : "https://via.placeholder.com/150"; // Ảnh mặc định nếu không có

          return (
            <div
              key={playlist.id}
              onClick={() => playPlayList(playlist.id)}
              className="playlist-card"
            >
              <img
                src={imageUrl}
                className="playlist-image"
                alt="playlist-Art"
              />
              <p className="playlist-title">{playlist.name}</p>
              <p className="playlist-subtitle">{playlist.tracks.total} Songs</p>
              <div className="playlist-fade">
                <IconContext.Provider
                  value={{ size: " 50px", color: "#E99D72" }}
                >
                  <AiFillPlayCircle />
                </IconContext.Provider>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
