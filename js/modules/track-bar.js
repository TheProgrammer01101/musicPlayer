import Playlist from "./playlist.js";

const TrackBar = (()=> {
  const state = {
    currentTrackTime: 0,
    fullTrackTime: 0,
    fillWidth: 0
  }

  // caching DOM
  const trackBarElement = document.querySelector('.track-bar');
  const trackBarFillElement = document.querySelector('.track-bar-fill');

  const init = ()=> {
    render();
    listeners();
  }

  const render = ()=> {
    trackBarFillElement.style.width = `${state.fillWidth}%`;
  }

  const listeners = () => {
    trackBarElement.addEventListener('click', (e)=> {
      const fullPixel = trackBarElement.offsetWidth;
      const currentClickedPixel = e.offsetX;
      const clickedPercentage = getPercentage(currentClickedPixel, fullPixel);
      const getPercentToSecond = (clickedPercentage)=> {
        return clickedPercentage * Playlist.currentSong.duration / 100;
      }
      Playlist.currentSong.currentTime = getPercentToSecond(clickedPercentage);
    });
  }

  const getPercentage = (current, full)=> {
    return (current/full) * 100;
  }

  const setState = obj => {
    state.currentTrackTime = obj.currentTime,
    state.fullTrackTime = obj.duration,
    state.fillWidth = getPercentage(state.currentTrackTime, state.fullTrackTime);
    render();
  }

  return {
    init,
    setState,
  }
})();

export default TrackBar;