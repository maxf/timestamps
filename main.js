(function() {

  const appState = {
    timestamps: []
  };

  const addTimestamp = function() {
    appState.timestamps.push(new Date());
  };

  const formatTimestamp = function(d) {
    return `${d.getDate()}/${d.getMonth()} - ${d.getHours()}:${d.getMinutes()}`;
  };

  const reset = function() {
    appState.timestamps = [];
  }

  const init = function() {
    new Vue({
      el: '#app',
      data: appState,
      methods: { addTimestamp, formatTimestamp, reset }
    });
  };

  document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
      init();
    }
  });

})();
