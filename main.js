(function() {

  const init = function() {
    new Vue({
      el: '#app',
      data: {
        message: 'Hello Vue.js!'
      }
    });
  };

  document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'complete') {
      init();
    }
  });

})();
