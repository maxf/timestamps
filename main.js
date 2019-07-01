(function() {

  const appState = {
    timestamps: [],
    newTimestamp: {
      date: '',
      month: '',
      year: '',
      hours: '',
      minutes: ''
    }
  };

  const prepareNewTimestamp = function() {
    const now = new Date();
    appState.newTimestamp = {
      date: now.getDate(),
      month: now.getMonth(),
      year: now.getYear(),
      hours: now.getHours(),
      minutes: now.getMinutes()
    };
  }

  const addTimestamp = function() {
    appState.timestamps.push(appState.newTimestamp);
  };

  const formatTimestamp = function(d) {
    return `${d.date}/${d.month} - ${d.hours}:${d.minutes}`;
  };

  const reset = function() {
    appState.timestamps = [];
  }

  const init = function() {
    new Vue({
      el: '#app',
      data: appState,
      methods: { addTimestamp, formatTimestamp, prepareNewTimestamp, reset }
    });
  };

  document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'interactive') {
      init();
    }
  });

})();
