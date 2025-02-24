import React from "react";
import "./audioPlayer.css";
import ProcessCircle from "./ProcessCircle";

export default function AudioPlayer({ currentTrack }) {
  return (
    <div className="audioPlayer-body">
      <div className="audioPlayer-left-body">
        <ProcessCircle
          percentage={75}
          isPlaying={true}
          //   image={currentTrack.images[0]?.url}
          size={300}
          color="#C96850"
        />
      </div>
      <div className="audioPlayer-right-body"></div>
    </div>
  );
}
