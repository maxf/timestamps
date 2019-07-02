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

  const formatTimestamp =
    d => `${d.date}/${d.month + 1}/${d.year} - ${d.hours}:${d.minutes}`;

  const methods = {
    formatTimestamp,

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
      localStorage.setItem('timestamps', JSON.stringify(appState.timestamps));
      appState.newTimestamp = emptyTimestamp;
    },

    deleteTimestamp: (timestampToRemove) => {
      appState.timestamps =
        appState.timestamps.filter(t => t.id !== timestampToRemove.id);
    },

    cancelAddTimestamp: () => appState.newTimestamp = emptyTimestamp,

    reset: () => {
      appState.timestamps = []
      localStorage.setItem('timestamps','[]');
    },

    // copy the timestamps to the clipboard
    copy: () => {
      const copyText = appState.timestamps
        .map(formatTimestamp)
        .join();
      navigator.clipboard.writeText(copyText);
    }
  };


  const updateFromLocalStorage = function() {
    const savedValue = localStorage.getItem('timestamps') || [];
    const newAppState = appState;
    try {
      newAppState.timestamps = JSON.parse(savedValue)
    } catch (error) {
      newAppState.timestamps = [];
      localStorage.setItem('timestamps', '[]');
    }
    return newAppState;
  };

  const init = function() {
    const updatedAppState = updateFromLocalStorage(appState);
    new Vue({
      methods,
      el: '#app',
      data: updatedAppState
    });
  };


  document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
      init();
    }
  });

})();
