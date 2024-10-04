"use client";
import React, { createContext, useState } from "react";

type TrackContextType = {
  currentTrackId: string | null;
  setCurrentTrackId: React.Dispatch<React.SetStateAction<string | null>>;
};

export const TrackContext = createContext<TrackContextType>({
  currentTrackId: null,
  setCurrentTrackId: () => {},
});

export const TrackProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);

  return (
    <TrackContext.Provider value={{ currentTrackId, setCurrentTrackId }}>
      {children}
    </TrackContext.Provider>
  );
};
