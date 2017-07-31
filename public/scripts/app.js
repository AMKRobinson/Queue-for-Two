// 'use strict'
//
//     var baseUrl = "https://api.themoviedb.org/3/";
//     // may need ?
//
//     // construct the uri with our apikey
//     var moviesSearchUrl = baseUrl + 'search/movie?api_key=' + '839d7feb4f5bcc5ced3921f101e4dfdc';
//     var query = "Gone With The Wind";
//
//
//     $(document).ready(function() {
//
//       // send off the query
//       $.ajax({
//         url: moviesSearchUrl + '&query=' + encodeURI(query),
//         dataType: "jsonp",
//         success: searchCallback
//       });
//     });
//
//     // callback for when we get back the results
//     function searchCallback(data) {
//      $(document.body).append('Found ' + data.total + ' results for ' + query);
//      var movies = data.movies;
//      $.each(movies, function(index, movie) {
//        $(document.body).append('<h1>' + movie.title + '</h1>');
//        $(document.body).append('<img src="' + movie.posters.thumbnail + '" />');
//      });
//     }
