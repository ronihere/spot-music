export const playAudio = (audioRef, setIsPlaying) => {
    audioRef.current.play().then((data) => {
      audioRef.current.play();
    });
    setIsPlaying(false);
    setTimeout(() => {
      setIsPlaying(true);
    }, 1000);
    console.log('util');
}