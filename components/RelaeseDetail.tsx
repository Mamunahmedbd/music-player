import { TrackContext } from "@/context/TrackContext";
import { Release } from "@/dummyData/music";
import React, { useContext } from "react";

type Props = {
  release: Release;
};

const ReleaseDetail = ({ release }: Props) => {
  const { setCurrentTrackId } = useContext(TrackContext);

  console.log(release);

  return (
    <div>
      <h2>
        {release.title} by {release.artist}
      </h2>
      <ul>
        {release.tracks.map((track) => (
          <li
            key={track.trackId}
            onClick={() => setCurrentTrackId(track.trackId)}
            className="p-2 shadow-md cursor-pointer hover:border-2 hover:border-gray-500"
          >
            {track.title} - {track.duration}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReleaseDetail;
