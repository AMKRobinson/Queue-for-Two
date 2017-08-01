'use strict';

$('#searchMoviesButton').on('click', function (event) {
  event.preventDefault();
  var query = $('#movieSearch').val();

  var settings = {
    'async': true,
    'crossDomain': true,
    'url': 'https://api.themoviedb.org/3/search/movie?api_key=839d7feb4f5bcc5ced3921f101e4dfdc&query=' + encodeURI(query),
    'method': 'GET',
    'headers': {},
    'data': '{}'
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
});
