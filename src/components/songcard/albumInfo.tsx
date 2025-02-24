import React from "react";
import "./albumInfo.css";

export default function AlbumInfo({ album }) {
  console.log(album);

  const artisans = album?.artists?.map((artist) => artist.name).join(", ");

  return (
    <div className="albumInfo-card">
      <div className="album-container">
        <div className="marquee">
          <p>{album?.name + " - " + artisans}</p>
        </div>
      </div>
      <div className="album-info">
        <p>{`${album?.name} is an ${album?.album_type} with ${album?.total_tracks} tracks`}</p>
      </div>
      <div className="album-release">
        <p>Release Date: {album?.release_date}</p>
      </div>
    </div>
  );
}
