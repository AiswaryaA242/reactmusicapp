import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import Album from "./components/albums/Album";
import Artist from "./components/artists/Artist";
import ArtistDetails from "./components/artists/ArtistDetails";
import AddSong from "./components/crud/Add_song";
import { data } from "./data";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AlbumDetails from "./components/albums/AlbumDetails";

function App() {
  const [songs, setSongs] = useState(data);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Function to add a song
  const addSong = (newSong) => {
    setSongs((prevSongs) => [...prevSongs, newSong]);
  };

  // Filter songs based on search query
  const filteredSongs = songs.filter((song) =>
    song.song_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // console.log(filteredSongs);//filtered songs will be displayed

  return (
    <Router>
      <Navbar onSearch={setSearchQuery} /> {/* Pass setSearchQuery to Navbar */}
      <Routes>
        <Route path="/" element={<Home Songs={filteredSongs} />} /> {/* Pass filteredSongs */}
        <Route path="/albums" element={<Album songs={songs} />} />
        <Route path="/album/:albumName" element={<AlbumDetails songs={songs} />} />
        <Route path="/artists" element={<Artist data={songs} />} />
        <Route path="/artists/:artistName" element={<ArtistDetails data={songs} />} />
        <Route path="/add-song" element={<AddSong addSong={addSong} />} />
      </Routes>
    </Router>
  );
}

export default App;

