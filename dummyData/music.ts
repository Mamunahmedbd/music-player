const releases = [
  {
    releaseId: "1",
    title: "Album 1",
    artist: "Artist 1",
    releaseDate: "2022-09-01",
    thumbnail:
      "https://cancerfocusni.org/wp-content/uploads/2019/10/Music-Notes-300-x-200-Event-page-thumbnail.png",
    tracks: [
      {
        trackId: "1",
        title: "Song 1",
        duration: "3:45",
        audioSrc: "http://localhost:3000/assets/music.mp3",
      },
      {
        trackId: "2",
        title: "Song 2",
        duration: "3:45",
        audioSrc:
          "https://hindisongs.fusionbd.com/downloads/mp3/hindi/Single_Tracks/O_Saki_Saki-Batla_House_FusionBD.Com.mp3",
      },
      {
        trackId: "3",
        title: "Song 3",
        duration: "4:20",
        audioSrc:
          "https%3A%2F%2Fbem-music.s3.amazonaws.com%2Fmusic-preview%2Fb0f3344e-bc6b-4090-b574-0f3015a00c8803523814-0123-496a-9d54-388023f1200f.mp3",
      },
    ],
  },
];

const tracks = releases.flatMap((release) => release.tracks);

export type Track = {
  trackId: string;
  title: string;
  duration: string;
  audioSrc: string;
};

export type Release = {
  releaseId: string;
  title: string;
  artist: string;
  releaseDate: string;
  thumbnail: string;
  tracks: Track[];
};

export { releases };
export { tracks };
