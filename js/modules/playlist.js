import { songsList } from "../data/songs.js";
import PlayInfo from "./play-info.js";
import TrackBar from "./track-bar.js";

const Playlist = (() => {
  let songs = songsList;
  let currentlyPlayingIndex = 0;
  let currentSong = new Audio(songs[currentlyPlayingIndex].url);

  // caching the DOM
  const playlistElement = document.querySelector('.playlist');

  const init = () => {
    render();
    listeners();
    PlayInfo.setState({
      songsLength: songs.length,
      isPaused: currentSong.paused
    })
  }

  const flip = ()=> {
    toggleAudioPlayPause();
    render();
  }

  const updateAudioSrc = () => {
    currentSong.src = songs[currentlyPlayingIndex].url;
  }

  const toggleAudioPlayPause = () => {
    return currentSong.paused ? currentSong.play() : currentSong.pause();
  }

  const play = clickedIndex => {
  if(currentlyPlayingIndex == clickedIndex)
    toggleAudioPlayPause();
  else {
    currentlyPlayingIndex = clickedIndex;
    updateAudioSrc();
    toggleAudioPlayPause();
  }
  PlayInfo.setState({
    songsLength: songs.length,
    isPaused: currentSong.paused
  })
  render();
  }

  const playNext = ()=> {
    if(songs[currentlyPlayingIndex + 1]) {
      currentlyPlayingIndex++;
      updateAudioSrc();
      toggleAudioPlayPause();
      render();
    }
  }

  const getIndexToPlay = event=> {
    if(event.target.matches('i')) {
      const iconIndex = event.target.dataset.index;
      play(iconIndex);
    }
  }

  const listeners = ()=> {
    playlistElement.addEventListener('click', getIndexToPlay);

    currentSong.addEventListener('timeupdate', ()=> {
      TrackBar.setState(currentSong);
    })

    currentSong.addEventListener('ended', playNext);
  }

  const render = () => {
    let markup = '';
    const toggleIcon = itemIndex => {
      if(currentlyPlayingIndex == itemIndex)
        return currentSong.paused ? 'fa-play' : 'fa-pause';
      else 
        return 'fa-play';
    }
    songs.forEach((songObject, index) => {
      markup += `
      <li class="playlist-song ${index == currentlyPlayingIndex ? 'playlist-song-active' : ''}">
        <div class="play-pause">
          <i class="fa ${toggleIcon(index)} pp-icon" data-index=${index}></i>
        </div>
        <div class="playlist-song-details">
          <span class="playlist-song-name">${songObject.title}</span>
          <br>
          <span class="playlist-song-artist">${songObject.artist}</span>
        </div>
        <div class="playlist-song-duration">
          ${songObject.time}
        </div>
      </li>
      `;
    })
    playlistElement.innerHTML = markup;
  }
  return {
    init,
    flip,
    currentSong
  }
})();

export default Playlist;

