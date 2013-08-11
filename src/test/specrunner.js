define(['jasmine-html'],function(jasmine){
  var jasmineEnv = jasmine.getEnv();
  jasmineEnv.updateInterval = 250;

  var htmlReporter = new jasmine.HtmlReporter({env:jasmineEnv});
  jasmineEnv.addReporter(htmlReporter);

  jasmineEnv.specFilter = function(spec) {
    return htmlReporter.specFilter(spec);
  };

  var currentWindowOnload = window.onload;
  window.onload = function() {
    if (currentWindowOnload) {
      currentWindowOnload();
    }

    document.getElementById('test-results').innerHTML = jasmineEnv.versionString();
    execJasmine();
  };

  (function() {
    function execJasmine() {
      require('test/ai/tictactoespec', function(spec){
        jasmineEnv.execute();
      });
    }
  })();
});