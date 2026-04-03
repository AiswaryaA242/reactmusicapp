import React, { useRef, useState, useEffect } from "react";
import "./player.css";

const Player = ({
  songs = [],
  selectedSong,
  setSelectedSong,
  isPlaying,
  setIsPlaying,
  likedSongs = new Set(),
  setLikedSongs,
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: all, 2: one
  const audioRef = useRef(null);

  useEffect(() => {
    if (!selectedSong || !audioRef.current || !selectedSong.song_url) return;

    const audio = audioRef.current;
    audio.src = selectedSong.song_url;
    audio.volume = volume;

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.onended = () => {
      if (repeatMode === 2) {
        audio.currentTime = 0;
        audio.play();
      } else {
        handleNext();
      }
    };

    if (isPlaying) {
      audio.play().catch((error) => console.error("Error playing the song", error));
    } else {
      audio.pause();
    }

    return () => {
      audio.onloadedmetadata = null;
      audio.ontimeupdate = null;
      audio.onended = null;
    };
  }, [selectedSong, isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleNext = () => {
    if (songs.length === 0) return;
    const currentIndex = songs.findIndex((song) => song.id === selectedSong?.id);
    let nextIndex;
    if (isShuffle) {
      nextIndex = Math.floor(Math.random() * songs.length);
    } else {
      nextIndex = (currentIndex + 1) % songs.length;
    }
    setSelectedSong(songs[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    if (songs.length === 0) return;
    const currentIndex = songs.findIndex((song) => song.id === selectedSong?.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    setSelectedSong(songs[prevIndex]);
    setIsPlaying(true);
  };

  const handleSeek = (event) => {
    const newTime = parseFloat(event.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };

  const toggleShuffle = () => {
    setIsShuffle((prev) => !prev);
  };

  const toggleRepeat = () => {
    setRepeatMode((prev) => (prev + 1) % 3);
  };

  const handleLike = () => {
    if (!selectedSong || !setLikedSongs) return;
    setLikedSongs((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(selectedSong.id)) {
        newLiked.delete(selectedSong.id);
      } else {
        newLiked.add(selectedSong.id);
      }
      return newLiked;
    });
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const getVolumeIcon = () => {
    if (volume === 0) return "bi-volume-mute-fill";
    if (volume < 0.5) return "bi-volume-down-fill";
    return "bi-volume-up-fill";
  };

  const getRepeatIcon = () => {
    if (repeatMode === 2) return "bi-repeat-1";
    return "bi-repeat";
  };

  if (!selectedSong || !selectedSong.song_url) {
    return null;
  }

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;
  const isLiked = likedSongs.has(selectedSong.id);

  return (
    <div className="audio-player">
      {/* Left - Song Info */}
      <div className="player-details">
        <img
          src={selectedSong.image}
          alt={selectedSong.song_name}
          className="player-image"
        />
        <div className="player-info">
          <h4>{selectedSong.song_name}</h4>
          <p>{selectedSong.artist}</p>
        </div>
        <button
          className={`like-btn ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
          title={isLiked ? "Unlike" : "Like"}
        >
          <i className={`bi ${isLiked ? "bi-heart-fill" : "bi-heart"}`}></i>
        </button>
      </div>

      {/* Center - Controls */}
      <div className="player-center">
        <div className="player-controls">
          <button
            onClick={toggleShuffle}
            className={`control-btn shuffle ${isShuffle ? "active" : ""}`}
            title="Shuffle"
          >
            <i className="bi bi-shuffle"></i>
          </button>
          <button onClick={handlePrevious} className="control-btn" title="Previous">
            <i className="bi bi-skip-start-fill"></i>
          </button>
          <button
            onClick={handlePlayPause}
            className="control-btn play-pause-btn"
            title={isPlaying ? "Pause" : "Play"}
          >
            <i className={`bi ${isPlaying ? "bi-pause-fill" : "bi-play-fill"}`}></i>
          </button>
          <button onClick={handleNext} className="control-btn" title="Next">
            <i className="bi bi-skip-end-fill"></i>
          </button>
          <button
            onClick={toggleRepeat}
            className={`control-btn repeat ${repeatMode > 0 ? "active" : ""}`}
            title={repeatMode === 0 ? "Repeat Off" : repeatMode === 1 ? "Repeat All" : "Repeat One"}
          >
            <i className={`bi ${getRepeatIcon()}`}></i>
          </button>
        </div>
        <div className="time-controls">
          <span className="current-time">{formatTime(currentTime)}</span>
          <div className="progress-wrapper">
            <div
              className="progress-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
            <input
              type="range"
              min="0"
              max={duration || 0}
              step="0.1"
              value={currentTime}
              onChange={handleSeek}
              className="progress-bar"
            />
          </div>
          <span className="duration-time">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right - Volume */}
      <div className="player-right">
        <div className="volume-wrapper">
          <button
            className="volume-btn"
            onClick={() => setVolume(volume === 0 ? 0.7 : 0)}
            title={volume === 0 ? "Unmute" : "Mute"}
          >
            <i className={`bi ${getVolumeIcon()}`}></i>
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>

      <audio ref={audioRef} />
    </div>
  );
};

export default Player;
