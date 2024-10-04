"use client";
import MusicPlayer from "@/components/MusicPlayer";
import Player from "@/components/Player";
import React from "react";

export default function Home() {
  const [isMinimized, setIsMinimized] = React.useState(false);
  const [isVideoPlayerOpen, setIsVideoPlayerOpen] = React.useState(false);
  return (
    <React.Fragment>
      <h1>Music Player</h1>
      {/* <button onClick={() => setIsMinimized(!isMinimized)}>Minimize</button> */}

      <button onClick={() => setIsVideoPlayerOpen(!isVideoPlayerOpen)}>
        Video player
      </button>

      <MusicPlayer />
      <Player
        onToggleView={() => {}}
        isMinimized={false}
        onSetIsMinimized={() => {}}
        onToggleVideoPlayer={() => {}}
      />
    </React.Fragment>
  );
}
