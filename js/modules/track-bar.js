const TrackBar = (()=> {
  const state = {
    currentTrackTime: 0,
    fullTrackTime: 0,
    fillWidth: 0
  }

  // caching DOM
  const trackBarFillElement = document.querySelector('.track-bar-fill');

  const init = ()=> {
    render();
  }

  const render = ()=> {
    trackBarFillElement.style.width = `${state.fillWidth}%`;
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