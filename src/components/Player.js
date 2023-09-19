import React, { useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause
} from '@fortawesome/free-solid-svg-icons'
import { playAudio } from '../util'

export default function Player ({
  currentSong,
  isPlaying,
  setIsPlaying,
  audioRef,
  songs,
  setCurrentSong,
  setSongs
}) {
  //functions
  let activeLibraryHandler = (id) => {
    let newSongs = songs.map((song) => {
      if (song.id === id) {
        return {
          ...song,
          active:true,
        }
      } else {
        return {
          ...song,
          active: false,
        }
      }
    })
    setSongs(newSongs);
    playAudio(audioRef, setIsPlaying);
  }
  function getTime (seconds) {
    let minutes = Math.floor(seconds / 60)
    let remainingSeconds = Math.round(seconds % 60)
    remainingSeconds =
      remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds
    return `${minutes}:${remainingSeconds}`
  }
  let songChangeHandler = direction => {
    let currentIndex = songs.findIndex(song => {
      return song.id === currentSong.id
    })
    if (direction === 'forward') {
      if (currentIndex === songs.length - 1) {
        currentIndex = -1
      }
      setCurrentSong(songs[currentIndex + 1]);
      activeLibraryHandler(currentSong.id);
    } else if (direction === 'backward') {
      if (currentIndex === 0) {
        currentIndex = songs.length;
      }
      setCurrentSong(songs[currentIndex - 1]);
      activeLibraryHandler(currentSong.id);
    }
  }
  //event handlers
  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => {
      return song.id === currentSong.id;
    });
    if (currentIndex === songs.length - 1) {
      currentIndex = -1;
    }
    await setCurrentSong(songs[currentIndex + 1]);
  }
  const playSongHandler = () => {
    if (!isPlaying) {
      audioRef.current.play()
      setIsPlaying(!isPlaying)
    } else {
      audioRef.current.pause()
      setIsPlaying(!isPlaying)
    }
  }

  const timeUpdateHandler = event => {
    let duration = Math.round(event.target.duration);
    let currentTime = Math.round(event.target.currentTime);
    let animationPercentage = Math.round((currentTime / duration) * 100);
    setSongInfo({
      duration: String(event.target.duration),
      currentTime: event.target.currentTime,
      animationPercentage: animationPercentage
    })
    console.log(animationPercentage);
  }

  const dragHandler = event => {
    audioRef.current.currentTime = event.target.value
    setSongInfo({
      ...songInfo,
      currentTime: event.target.value
    })
  }
  //state
  const [songInfo, setSongInfo] = useState({
    duration: 0,
    currentTime: 0,
    animationPercentage: 0
  })

//vars
  const trackAnimation = {
    transform : `translateX(${songInfo.animationPercentage}%)`
  }
  const dynamicInputColor = { background: `linear-gradient(to right,${currentSong.color[0]},${currentSong.color[1]})` };


  return (
    <div className="Player">
      <div className="time-control">
        <p>{getTime(songInfo.currentTime)}</p>
        <div style={dynamicInputColor} className="input-range">
          <input
            min={0}
            max={songInfo.duration}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={trackAnimation} className="animate-input"></div>
        </div>

        <p>{getTime(songInfo.duration)}</p>
      </div>
      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => songChangeHandler("backward")}
          className="skip-back svg"
          size="2x"
          icon={faAngleLeft}
        ></FontAwesomeIcon>

        <FontAwesomeIcon
          className="play"
          icon={isPlaying ? faPause : faPlay}
          onClick={playSongHandler}
          size="2x"
        />

        <FontAwesomeIcon
          className="skip-forward svg"
          size="2x"
          icon={faAngleRight}
          onClick={() => songChangeHandler("forward")}
        ></FontAwesomeIcon>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        src={currentSong.audio}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}
