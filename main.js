(function() {

  const appState = {
    timestamps: [], // array of Date
    newTimestamp: null // null or { date, month, year, hours, minutes }
  };

  const formatTimestamp =
    d => `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} - ${d.getHours()}:${d.getMinutes()}`;

  const methods = {
    formatTimestamp,

    prepareNewTimestamp: () => {
      var now = new Date();
      appState.newTimestamp = {
        date: now.getDate(),
        month: now.getMonth(),
        year: now.getFullYear(),
        hours: now.getHours(),
        minutes: now.getMinutes(),
      }
    },

    addTimestamp: () => {
      const d = appState.newTimestamp;
      appState.timestamps.push(new Date(d.year, d.month, d.date, d.hours, d.minutes));
      localStorage.setItem('timestamps', JSON.stringify(appState.timestamps));
      appState.newTimestamp = null;
    },

    deleteTimestamp: (timestampToRemove) => {
      appState.timestamps =
        appState.timestamps.filter(t => t !== timestampToRemove);
    },

    cancelAddTimestamp: () => appState.newTimestamp = null,

    reset: () => {
      appState.timestamps = [];
      appState.newTimestamp = null;
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
      newAppState.timestamps = JSON.parse(savedValue).map(isoDate => new Date(Date.parse(isoDate)));
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
