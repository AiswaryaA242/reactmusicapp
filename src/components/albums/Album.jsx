import React from "react";
import { Link } from "react-router-dom";
import './album.css';

const Album = ({ songs }) => {
  // Create a list of unique albums with their first song's image
  const albums = [...new Map(
    songs.map((song) => [song.Movie_Name, {
      name: song.Movie_Name,
      image: song.image,
      songCount: songs.filter(s => s.Movie_Name === song.Movie_Name).length
    }])
  ).values()];

  return (
    <div className="album-list">
      <h2>Albums</h2>
      <div className="albums">
        {albums.map((album, index) => (
          <div key={index} className="album-card">
            <Link to={`/album/${album.name}`} className="album-link">
              <div className="album-icon">
                <i className="bi bi-vinyl"></i>
              </div>
              <div>
                <h3>{album.name}</h3>
                <span style={{ fontSize: '0.8rem', color: '#b3b3b3' }}>
                  {album.songCount} {album.songCount === 1 ? 'song' : 'songs'}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Album;
