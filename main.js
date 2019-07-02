(function() {

  const emptyTimestamp = {
    id: '',
    date: '',
    month: '',
    year: '',
    hours: '',
    minutes: ''
  };

  const appState = {
    timestamps: [],
    newTimestamp: emptyTimestamp
  };

  const methods = {
    prepareNewTimestamp: () => {
      const now = new Date();
      appState.newTimestamp = {
        id: now.getTime(),
        date: now.getDate(),
        month: now.getMonth(),
        year: now.getFullYear(),
        hours: now.getHours(),
        minutes: now.getMinutes()
      };
    },

    addTimestamp: () => {
      appState.timestamps.push(appState.newTimestamp);
      appState.newTimestamp = emptyTimestamp;
    },

    deleteTimestamp: (timestampToRemove) => {
      appState.timestamps =
        appState.timestamps.filter(t => t.id !== timestampToRemove.id);
    },

    cancelAddTimestamp: () => appState.newTimestamp = emptyTimestamp,

    formatTimestamp: d => `${d.date}/${d.month + 1} - ${d.hours}:${d.minutes}`,

    reset: () => appState.timestamps = []
  };

  const init = function() {
    new Vue({
      methods,
      el: '#app',
      data: appState
    });
  };

  document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
      init();
    }
  });

})();
