import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './artist.css';

const Artist = ({ data }) => {
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.length > 0) {
      // Get unique artists with song count
      const artistMap = new Map();
      data.forEach((song) => {
        if (artistMap.has(song.artist)) {
          artistMap.set(song.artist, artistMap.get(song.artist) + 1);
        } else {
          artistMap.set(song.artist, 1);
        }
      });
      const uniqueArtists = Array.from(artistMap, ([name, count]) => ({ name, count }));
      setArtists(uniqueArtists);
    }
  }, [data]);

  const handleArtistClick = (artist) => {
    navigate(`/artists/${artist}`);
  };

  return (
    <div className="artist-container">
      <h2>Artists</h2>
      <div className="artist-list">
        {artists.length > 0 ? (
          artists.map((artist, index) => (
            <div
              key={index}
              className="artist-card"
              onClick={() => handleArtistClick(artist.name)}
            >
              <div className="artist-avatar">
                <i className="bi bi-person-fill"></i>
              </div>
              <h3>{artist.name}</h3>
              <span className="artist-subtitle">
                {artist.count} {artist.count === 1 ? 'song' : 'songs'}
              </span>
            </div>
          ))
        ) : (
          <p style={{ color: '#b3b3b3', textAlign: 'center', gridColumn: '1 / -1' }}>
            No artists available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Artist;
