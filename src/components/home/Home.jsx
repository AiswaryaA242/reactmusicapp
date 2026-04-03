import React, { useState, useEffect } from "react";
import "./home.css";
import Player from "../player/Player";

const Home = ({ Songs: initialSongs }) => {
  const [songs, setSongs] = useState(initialSongs);
  const [selectedSong, setSelectedSong] = useState(null);
  const [likedSongs, setLikedSongs] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setSongs(initialSongs);
  }, [initialSongs]);

  const handleSongClick = (song) => {
    if (selectedSong?.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setSelectedSong(song);
      setIsPlaying(true);
    }
  };

  const handleDelete = (e, songId) => {
    e.stopPropagation();
    const updatedSongs = songs.filter((song) => song.id !== songId);
    setSongs(updatedSongs);
    if (selectedSong?.id === songId) {
      setSelectedSong(null);
      setIsPlaying(false);
    }
  };

  const handleLike = (e, songId) => {
    e.stopPropagation();
    setLikedSongs((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(songId)) {
        newLiked.delete(songId);
      } else {
        newLiked.add(songId);
      }
      return newLiked;
    });
  };

  return (
    <div className="home-container">
      <div className="song-list">
        <div className="section-header">
          <h2 className="section-title">Popular Tracks</h2>
        </div>
        <div className="row g-3">
          {songs.length > 0 ? (
            songs.map((song) => (
              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6" key={song.id}>
                <div
                  className={`song-card ${selectedSong?.id === song.id ? "playing" : ""}`}
                  onClick={() => handleSongClick(song)}
                >
                  <div className="image-container">
                    <img
                      src={song.image}
                      alt={song.song_name}
                      className="song-image"
                    />
                    <div className="play-overlay">
                      <i className={`bi ${selectedSong?.id === song.id && isPlaying ? "bi-pause-fill" : "bi-play-fill"}`}></i>
                    </div>
                  </div>
                  <div className="card-body">
                    <div className="card-title-row" style={{ display: 'flex', alignItems: 'center' }}>
                      {selectedSong?.id === song.id && isPlaying && (
                        <div className="now-playing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      )}
                      <h5 className="card-title">{song.song_name}</h5>
                    </div>
                    <p className="card-text">{song.Movie_Name}</p>
                    <div className="card-meta">
                      <span>{song.artist}</span>
                    </div>
                    <div className="card-actions">
                      <button
                        className={`action-btn ${likedSongs.has(song.id) ? "liked" : ""}`}
                        onClick={(e) => handleLike(e, song.id)}
                        title={likedSongs.has(song.id) ? "Unlike" : "Like"}
                      >
                        <i className={`bi ${likedSongs.has(song.id) ? "bi-heart-fill" : "bi-heart"}`}></i>
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={(e) => handleDelete(e, song.id)}
                        title="Delete"
                      >
                        <i className="bi bi-trash3"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <i className="bi bi-music-note-list"></i>
              <p>No songs found. Try a different search!</p>
            </div>
          )}
        </div>
      </div>

      <Player
        songs={songs}
        selectedSong={selectedSong}
        setSelectedSong={setSelectedSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        likedSongs={likedSongs}
        setLikedSongs={setLikedSongs}
      />
    </div>
  );
};

export default Home;
