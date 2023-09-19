import React from 'react';
import Librarysong from './Librarysong.js';
export default function Library({
  songs,
  currentSong,
  setCurrentSong,
  setIsPlaying,
  isPlaying,
  audioRef,
  setSongs,
  libraryStatus,
  setLibraryStatus,
}) {
  return (
    <div className={`library ${libraryStatus? 'library-active' : ''}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => {
          return (
            <Librarysong
              song={song}
              songs={songs}
              setCurrentSong={setCurrentSong}
              currentSong={currentSong}
              key={song.id}
              setIsPlaying={setIsPlaying}
              isPlaying={isPlaying}
              audioRef={audioRef}
              setSongs={setSongs}
            />
          );
        })}
      </div>
    </div>
  );
}
