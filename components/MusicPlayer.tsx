"use client";
import React, { useState, useEffect } from "react";
import whiteLogo from "@/assets/logo.png";
import { IoReturnUpBackSharp } from "react-icons/io5";
import Link from "next/link";
import Image from "next/image";
import { Release, releases } from "@/dummyData/music";
import ReleaseDetail from "./RelaeseDetail";
import SearchBar from "./SearchBar";
import ReleaseGrid from "./RelaseGrid";

const MusicPlayer = () => {
  const [selectedRelease, setSelectedRelease] = useState<Release>(
    {} as Release
  ); // Holds the currently selected release
  const [filteredReleases, setFilteredReleases] = useState<Release[]>(releases); // Filtered releases based on search

  // Handles search input to filter the releases and tracks
  const handleSearch = (query: string) => {
    const filtered = releases.filter(
      (release) =>
        release.title.toLowerCase().includes(query.toLowerCase()) ||
        release.tracks.some((track) =>
          track.title.toLowerCase().includes(query.toLowerCase())
        )
    );
    setFilteredReleases(filtered);
  };

  // Auto-select the first release when the filtered list changes
  useEffect(() => {
    if (filteredReleases.length > 0) {
      setSelectedRelease(filteredReleases[0]);
    }
  }, [filteredReleases]);

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-black text-white w-full">
      {/* Header and Search Bar */}
      <div className="flex items-center px-4 w-full border-b border-gray-800">
        <Link href="/home" className="hover:text-gray-100 hover:opacity-50">
          <div className="flex items-center">
            <Image
              src={whiteLogo}
              alt="Logo"
              className="w-40 mr-2"
              width={0}
              height={0}
            />
            <IoReturnUpBackSharp className="text-4xl" />
          </div>
        </Link>
        <SearchBar onSearch={handleSearch} />
      </div>

      {/* Release Grid */}
      <ReleaseGrid
        releases={filteredReleases}
        onSelectRelease={setSelectedRelease}
      />

      {/* Release Detail and Player */}
      <div className="flex border-t border-gray-800 items-start justify-left p-4 space-x-4 w-full">
        {Object.keys(selectedRelease).length > 0 ? (
          <>
            <div className="flex-shrink-0">
              {/* Release Detail shows tracks of the selected release */}
              <ReleaseDetail release={selectedRelease} />
            </div>
            <div className="p-2 w-full">{/* Player will go here */}</div>
          </>
        ) : (
          <div className="flex flex-row items-center px-32 justify-center h-full text-center text-white">
            <p className="text-xl p-8">
              Please click on a release to view details.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicPlayer;
