"use client";
import MusicPlayer from "@/components/MusicPlayer";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <React.Fragment>
      <h1>
        <Link href="/music">Music Player page</Link>
      </h1>

      <MusicPlayer />
    </React.Fragment>
  );
}
