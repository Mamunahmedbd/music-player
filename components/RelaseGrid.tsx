import { Release } from "@/dummyData/music";
import Image from "next/image";
import React from "react";

type IProps = {
  releases: Release[];
  onSelectRelease: (release: Release) => void;
};

const ReleaseGrid = ({ releases, onSelectRelease }: IProps) => {
  return (
    <div className="flex overflow-x-auto space-x-4 p-4 mx-8 scroll-smooth">
      {releases.map((release) => (
        <div
          key={release.releaseId}
          onClick={() => onSelectRelease(release)}
          className="cursor-pointer flex-shrink-0 hover:scale-110 duration-300"
        >
          <Image
            src={release.thumbnail}
            alt={release.title}
            className="w-40 h-40 object-contain rounded-md"
            width={0}
            height={0}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <p className="text-white mt-2 text-center">{release.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ReleaseGrid;
