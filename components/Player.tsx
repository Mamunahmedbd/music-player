"use client";
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { useWavesurfer } from "@wavesurfer/react";
import {
  FaPlay,
  FaPause,
  FaBackward,
  FaForward,
  FaRandom,
  FaSync,
  FaVolumeUp,
  FaExpandArrowsAlt,
  FaVideo,
  FaCompress,
  FaExpand,
} from "react-icons/fa";
import Hover from "wavesurfer.js/dist/plugins/hover.esm.js";
import useWindowSize from "@/hooks/useWindowSize";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tracks } from "@/dummyData/music";
import { TrackContext } from "@/context/TrackContext";

// Mapping audio URLs from track data for use in the player
const audioUrls = tracks.map((track) => ({
  trackId: track.trackId,
  audioSrc: track.audioSrc,
  name: track.title,
}));

const Player = ({
  onToggleView,
  isMinimized,
  onSetIsMinimized,
  onToggleVideoPlayer,
}: {
  onToggleView: () => void;
  isMinimized: boolean;
  onSetIsMinimized: (isMinimized: boolean) => void;
  onToggleVideoPlayer: () => void;
}) => {
  // Responsive hooks for determining screen width
  const { width } = useWindowSize();
  const isTablet = width < 1024; // Consider tablet if width is less than 1024px
  //   const isMobile = width < 769; // Consider mobile if width is less than 769px

  // Refs for DOM elements and WebAudio contexts
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gradientRef = useRef(null);
  const progressRef = useRef(null);

  // Player state management
  const [urlIndex, setUrlIndex] = useState(0); // Currently selected track index
  const [isPlaying, setIsPlaying] = useState(false); // Playback state
  const [volume, setVolume] = useState(1); // Volume level
  const [isVolboxVisible, setIsVolboxVisible] = useState(false); // Visibility of volume control
  const [isLoopEnabled, setIsLoopEnabled] = useState(false); // Looping state
  const [isShuffleEnabled, setIsShuffleEnabled] = useState(false); // Shuffle state
  const { currentTrackId } = useContext(TrackContext); // Track context

  // Use location to detect if on music page
  const location = usePathname();
  const isMusicPage = location.endsWith("/music");

  // If on the music page, expand the player
  useEffect(() => {
    if (isMusicPage) {
      onSetIsMinimized(false);
    }
  }, [isMusicPage, onSetIsMinimized]);

  // Toggle visibility of volume control box
  const toggleVolbox = () => {
    setIsVolboxVisible(!isVolboxVisible);
  };

  // Toggle loop mode
  const toggleLoop = () => {
    setIsLoopEnabled((prevValue) => !prevValue);
  };

  // Toggle shuffle mode
  const toggleShuffle = () => {
    setIsShuffleEnabled(!isShuffleEnabled);
  };

  // Play the track and expand player view
  const onPlayOpen = () => {
    onPlayPause();
    onToggleView();
  };

  // Get next track index, randomizing if shuffle mode is enabled
  const getNextIndex = useCallback(() => {
    if (isShuffleEnabled) {
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * audioUrls.length);
      } while (nextIndex === urlIndex);
      return nextIndex;
    } else {
      return (urlIndex + 1) % audioUrls.length; // Move to the next track or loop back to the first
    }
  }, [isShuffleEnabled, urlIndex]);

  // Initialize canvas and gradients for waveform display
  useEffect(() => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext(
        "2d"
      ) as CanvasRenderingContext2D;
      const gradient = ctx.createLinearGradient(0, 0, 0, 150);

      // Gradient for waveform background
      gradient.addColorStop(0, "rgb(200, 200, 200)");
      gradient.addColorStop(0.7, "rgb(100, 100, 100)");
      gradient.addColorStop(1, "rgb(0, 0, 0)");

      gradientRef.current = gradient;

      // Gradient for progress bar
      const progress = ctx.createLinearGradient(0, 0, 0, 150);
      progress.addColorStop(0, "rgb(255, 185, 0)");
      progress.addColorStop(0.7, "rgb(255, 120, 0)");
      progress.addColorStop(1, "rgb(255, 40, 0)");
      progressRef.current = progress;
    }
  }, []);

  // WaveSurfer initialization and setup
  const { wavesurfer } = useWavesurfer({
    container: containerRef,
    height: 40,
    autoplay: false,
    waveColor: gradientRef.current || "rgb(200, 0, 200)", // Waveform color
    progressColor: progressRef.current || "rgb(100, 0, 100)", // Progress bar color
    barWidth: 1,
    barGap: 1,
    barRadius: 10,
    url: audioUrls[urlIndex].audioSrc, // Current audio track
    plugins: useMemo(
      () => [
        Hover.create({
          lineColor: "#ff0000",
          lineWidth: 2,
          labelBackground: "#555",
          labelColor: "#fff",
          labelSize: "11px",
        }),
      ],
      []
    ),
  });

  // Go to the next track
  const onNext = useCallback(() => {
    setUrlIndex(getNextIndex());
  }, [getNextIndex]);

  // Go to the previous track
  const onPrev = useCallback(() => {
    setUrlIndex((index) => (index - 1 + audioUrls.length) % audioUrls.length);
  }, []);

  // Toggle playback state
  const onPlayPause = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.playPause();
      setIsPlaying(!isPlaying);
    }
  }, [wavesurfer, isPlaying]);

  // Handle track switching and autoplay when track finishes
  useEffect(() => {
    if (wavesurfer) {
      const handleFinish = () => {
        if (isLoopEnabled) {
          wavesurfer.play(); // Replay the track if looping is enabled
        } else {
          setUrlIndex(getNextIndex()); // Go to next track
        }
      };

      wavesurfer.on("finish", handleFinish);
      return () => {
        wavesurfer.un("finish", handleFinish);
      };
    }
  }, [wavesurfer, urlIndex, isLoopEnabled, getNextIndex]);

  // Play track automatically when ready
  useEffect(() => {
    if (wavesurfer) {
      const handleReady = () => {
        if (isPlaying) {
          wavesurfer.play();
        }
      };

      wavesurfer.on("ready", handleReady);
      return () => {
        wavesurfer.un("ready", handleReady);
      };
    }
  }, [wavesurfer, isPlaying]);

  // Volume control
  const onChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseInt(e.target.value));
    wavesurfer?.setVolume(parseInt(e.target.value));
  };

  // Adjust player size based on minimization
  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.setOptions({
        width: isMinimized ? 50 : "",
      });
    }
  }, [wavesurfer, isMinimized]);

  // Handle external track changes via context
  useEffect(() => {
    if (currentTrackId !== null) {
      const trackIndex = audioUrls.findIndex(
        (track) => track.trackId === currentTrackId
      );
      if (trackIndex !== -1) {
        setUrlIndex(trackIndex);
        setIsPlaying(true); // Auto-play selected track
      }
    }
  }, [currentTrackId]);

  return (
    <div
      className={`flex ${
        isTablet && !isMinimized ? "flex-col" : "flex-row"
      } items-center justify-between pl-1 pr-1 text-white`}
    >
      <div className="flex items-center gap-2 pr-2 px-4">
        {/* Play/Pause button for minimized state */}
        {!isPlaying && isMinimized ? (
          <button
            onClick={onPlayOpen}
            className={`toggle-view-button w-6 h-6 ${
              isTablet && "mt-4"
            } rounded-full bg-transparent text-orange-500 flex items-center justify-center text-lg hover:text-white hover:scale-125 transition-colors duration-300`}
          >
            <FaPlay />
          </button>
        ) : (
          !isMusicPage && (
            <button
              onClick={onToggleView}
              className={`toggle-view-button w-6 h-6 ${
                isTablet && isMinimized && "mt-4"
              } rounded-full bg-transparent text-orange-500 flex items-center justify-center text-lg hover:text-white hover:scale-125 transition-colors duration-300`}
            >
              {isMinimized ? <FaExpand /> : <FaCompress />}
            </button>
          )
        )}

        {/* Shuffle, Previous, Play/Pause, Next, Loop controls */}
        {!isMinimized && (
          <>
            <button
              onClick={toggleShuffle}
              className={`w-6 h-6 rounded-full bg-transparent flex items-center justify-center text-sm transition-colors hover:scale-125 duration-300 ${
                isShuffleEnabled
                  ? "text-white"
                  : "text-orange-500 hover:text-white"
              }`}
            >
              <FaRandom />
            </button>
            <button
              onClick={onPrev}
              className="w-6 h-6 rounded-full bg-transparent text-orange-500 flex items-center justify-center text-lg hover:text-white hover:scale-125 transition-colors duration-300"
            >
              <FaBackward />
            </button>
            <button
              onClick={onPlayPause}
              className="w-8 h-8 rounded-full bg-transparent text-orange-500 flex items-center justify-center text-xl hover:text-white hover:scale-125 transition-colors duration-300"
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button
              onClick={onNext}
              className="w-6 h-6 rounded-full bg-transparent text-orange-500 flex items-center justify-center text-lg hover:text-white hover:scale-125 transition-colors duration-300"
            >
              <FaForward />
            </button>
            <button
              onClick={toggleLoop}
              className={`w-6 h-6 rounded-full bg-transparent flex items-center justify-center text-sm transition-colors hover:scale-125 duration-300 ${
                isLoopEnabled
                  ? "text-white"
                  : "text-orange-500 hover:text-white"
              }`}
            >
              <FaSync />
            </button>
          </>
        )}
      </div>

      {/* Waveform display */}
      <div className={`flex-1 audio-file ${isTablet ? "w-full mt-4" : ""}`}>
        <canvas ref={canvasRef} style={{ display: "none" }} />
        <div ref={containerRef} className="w-full"></div>
      </div>

      {/* Volume and other controls */}
      {!isMinimized && (
        <div className="flex text-right pl-2">
          {!isTablet && (
            <>
              <button
                onClick={toggleVolbox}
                className="w-8 h-8 pt-3 rounded-full bg-transparent text-orange-500 flex items-center justify-center text-2xl hover:text-white hover:scale-125 transition-colors duration-300"
              >
                <FaVolumeUp />
              </button>
              {isVolboxVisible && (
                <div className="ml-2 pt-3">
                  <input
                    id="volume"
                    onChange={onChangeVolume}
                    type="range"
                    min="0"
                    max="1"
                    value={volume}
                    step="0.1"
                  />
                </div>
              )}
            </>
          )}
          <div className="text-lg text-gray-300 pt-2 pb-2 pl-2 pr-2">
            {audioUrls[urlIndex].name} {/* Display current track name */}
          </div>
          {isMusicPage && !isTablet && (
            <button
              onClick={onToggleVideoPlayer}
              className="w-8 h-8 pt-3 rounded-full bg-transparent text-orange-500 flex items-center justify-center text-2xl hover:text-white hover:scale-125  transition-colors duration-300"
            >
              <FaVideo />
            </button>
          )}
          {!isMusicPage && (
            <div className="relative group">
              <Link
                href="/music"
                className="w-8 h-8 pt-3 rounded-full bg-transparent text-orange-500 flex items-center justify-center text-2xl hover:text-white hover:scale-125  transition-colors duration-300"
              >
                <FaExpandArrowsAlt />
              </Link>

              <div className="absolute bottom-full left-1 transform -translate-x-1/2 -translate-y-3 hidden group-hover:block bg-black text-white text-md rounded py-2 px-4">
                Open Music Player
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Player;
