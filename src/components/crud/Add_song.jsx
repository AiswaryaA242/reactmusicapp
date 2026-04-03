import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addsong.css';

const AddSong = ({ addSong }) => {
  const navigate = useNavigate();

  const [songName, setSongName] = useState("");
  const [artist, setArtist] = useState("");
  const [movieName, setMovieName] = useState("");
  const [music, setMusic] = useState("");
  const [songFile, setSongFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSongFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSongFile(file);
    }
  };

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const songUrl = URL.createObjectURL(songFile);
    const imageUrl = URL.createObjectURL(imageFile);

    const newSong = {
      id: Date.now(),
      song_name: songName,
      artist,
      Movie_Name: movieName,
      music,
      song_url: songUrl,
      image: imageUrl
    };

    addSong(newSong);
    navigate("/");
  };

  return (
    <div className="add-song-container">
      <div className="add-song-card">
        <div className="add-song-header">
          <i className="bi bi-music-note-beamed"></i>
          <h2>Add New Song</h2>
          <p>Fill in the details to add a new track to your library</p>
        </div>

        <form onSubmit={handleSubmit} className="add-song-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="songName">
                <i className="bi bi-music-note"></i>
                Song Name
              </label>
              <input
                type="text"
                id="songName"
                value={songName}
                onChange={(e) => setSongName(e.target.value)}
                placeholder="Enter song name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="artist">
                <i className="bi bi-person"></i>
                Artist
              </label>
              <input
                type="text"
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
                placeholder="Enter artist name"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="movieName">
                <i className="bi bi-film"></i>
                Album / Movie
              </label>
              <input
                type="text"
                id="movieName"
                value={movieName}
                onChange={(e) => setMovieName(e.target.value)}
                placeholder="Enter album or movie name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="music">
                <i className="bi bi-disc"></i>
                Music Director
              </label>
              <input
                type="text"
                id="music"
                value={music}
                onChange={(e) => setMusic(e.target.value)}
                placeholder="Enter music director"
              />
            </div>
          </div>

          <div className="form-row file-row">
            <div className="form-group file-group">
              <label>
                <i className="bi bi-file-music"></i>
                Audio File
              </label>
              <div className="file-upload">
                <input
                  type="file"
                  id="songFile"
                  accept="audio/*"
                  onChange={handleSongFileChange}
                  required
                />
                <label htmlFor="songFile" className="file-label">
                  <i className="bi bi-cloud-upload"></i>
                  <span>{songFile ? songFile.name : 'Choose audio file'}</span>
                </label>
              </div>
            </div>

            <div className="form-group file-group">
              <label>
                <i className="bi bi-image"></i>
                Cover Image
              </label>
              <div className="file-upload">
                <input
                  type="file"
                  id="imageFile"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  required
                />
                <label htmlFor="imageFile" className="file-label">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="image-preview" />
                  ) : (
                    <>
                      <i className="bi bi-cloud-upload"></i>
                      <span>Choose cover image</span>
                    </>
                  )}
                </label>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate('/')}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              <i className="bi bi-plus-lg"></i>
              Add Song
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSong;
