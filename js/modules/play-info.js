const PlayInfo = (()=> {
  const state = {
    songsLength: 0,
    isPaused: true
  }

  // caching the DOM
  const playerCountElement = document.querySelector('.player-count');
  const playerTriggerElement = document.querySelector('.player-trigger');

  const init = ()=> {
    render();
  }

  const setState = obj => {
    state.songsLength = obj.songsLength
    state.isPaused = obj.isPaused;
    render();
  }

  const render = ()=> {
    playerCountElement.innerHTML = state.songsLength;
    playerTriggerElement.innerHTML = state.isPaused ? 'Play' : 'Pause';
  }
  return {
    init,
    setState
  }
})();

export default PlayInfo;