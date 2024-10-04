"use client";
import Player from "@/components/Player";
import React, { createContext, useState } from "react";

type TrackContextType = {
  currentTrackId: string | null;
  setCurrentTrackId: React.Dispatch<React.SetStateAction<string | null>>;
};

export const TrackContext = createContext<TrackContextType>({
  currentTrackId: null,
  setCurrentTrackId: () => {},
});

const TrackProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);

  return (
    <TrackContext.Provider value={{ currentTrackId, setCurrentTrackId }}>
      {children}
      <Player
        onToggleView={() => {}}
        isMinimized={false}
        onSetIsMinimized={() => {}}
        onToggleVideoPlayer={() => {}}
      />
    </TrackContext.Provider>
  );
};

export default TrackProvider;
