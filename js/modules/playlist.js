import { songsList } from "../data/songs.js";
import PlayInfo from "./play-info.js";
const Playlist = (() => {
  let songs = songsList;
  let currentlyPlayingIndex = 0;
  let currentSong = new Audio(songs[currentlyPlayingIndex].url);
  let isPlaying = false;

  currentSong.currentTime = 280;
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

  const updateAudioSrc = () => {
    currentSong.src = songs[currentlyPlayingIndex].url;
  }

  const togglePlayPause = () => {
    return currentSong.paused ? currentSong.play() : currentSong.pause();
  }

  const play = clickedIndex => {
    if(currentlyPlayingIndex == clickedIndex)
      togglePlayPause();
    else {
      currentlyPlayingIndex = clickedIndex;
      updateAudioSrc();
      togglePlayPause();
    }
    PlayInfo.setState({
      songsLength: songs.length,
      isPaused: currentSong.paused
    })
  }

  const playNext = ()=> {
    if(songs[currentlyPlayingIndex + 1]) {
      currentlyPlayingIndex++;
      updateAudioSrc();
      togglePlayPause();
      render();
    }
  }

  const listeners = ()=> {
    playlistElement.addEventListener('click', event => {
      if(event.target.matches('i')) {
        const indexOfIcon = event.target.dataset.index;
        play(indexOfIcon);
        render();
      }
    })
    currentSong.addEventListener('ended', ()=> {
      playNext();
    })
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
    init
  }
})();

export default Playlist;

