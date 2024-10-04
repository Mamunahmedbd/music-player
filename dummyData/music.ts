const releases = [
  {
    releaseId: "1",
    title: "Album 1",
    artist: "Artist 1",
    releaseDate: "2024-09-01",
    thumbnail:
      "https://cancerfocusni.org/wp-content/uploads/2019/10/Music-Notes-300-x-200-Event-page-thumbnail.png",
    tracks: [
      {
        trackId: "2",
        title: "Franz Schubert's Ständchen - Voice (Clarinet) & Piano",
        duration: "3:07",
        audioSrc:
          "https://www.mfiles.co.uk/mp3-downloads/franz-schubert-standchen-serenade.mp3",
      },
      {
        trackId: "3",
        title: "Song 3",
        duration: "4:20",
        audioSrc:
          "https://bem-music.s3.amazonaws.com%2Fmusic-preview%2Fb0f3344e-bc6b-4090-b574-0f3015a00c8803523814-0123-496a-9d54-388023f1200f.mp3",
      },
    ],
  },
  {
    releaseId: "2",
    title: "Album 2",
    artist: "Artist 2",
    releaseDate: "2024-09-02",
    thumbnail:
      "https://www.shutterstock.com/image-vector/banner-background-music-instrumental-element-260nw-2449515295.jpg",
    tracks: [
      {
        trackId: "1",
        title: "Brahms: St Anthony Chorale - Theme, Two Pianos Op.56b",
        duration: "2:04",
        audioSrc:
          "https://www.mfiles.co.uk/mp3-downloads/brahms-st-anthony-chorale-theme-two-pianos.mp3",
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
