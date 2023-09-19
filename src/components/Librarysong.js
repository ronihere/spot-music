import React from "react";
import { playAudio } from "../util";
export default function Librarysong({
  song,
  setCurrentSong,
  setIsPlaying,
  isPlaying,
  audioRef,
  songs,
  setSongs,
}) {
  let songSelectHandler = () => {
    setCurrentSong(song);
    let newSongs = songs.map((allSong) => {
      if (allSong.id === song.id) {
        return {
          ...allSong,
          active: true,
        };
      } else {
        return {
          ...allSong,
          active: false,
        };
      }
    });
    setSongs(newSongs);
    song.active = true;
    playAudio(audioRef, setIsPlaying);
  };
  return (
    <div
      onClick={songSelectHandler}
      className={`library-song ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover}></img>
      <div className="description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}
