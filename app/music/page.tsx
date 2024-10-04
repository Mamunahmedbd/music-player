import Link from "next/link";
import React from "react";

export default function MusicPage() {
  return (
    <div>
      {" "}
      <div className="min-h-[calc(100vh-5rem)] flex gap-4">
        <h2 className="text-2xl">Welcome to music page!</h2>
        <h2 className="text-2xl">
          <Link href="/">Back to home</Link>
        </h2>
      </div>
    </div>
  );
}
