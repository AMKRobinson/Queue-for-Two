'use strict';

//User Login Form .on('click')
$('.userLoginForm').hide();
$('.loginButton').on('click', function() {
  $('.userLoginForm').fadeIn(700);
  $('.loginButton2').fadeIn(700);
  $('.loginButton').fadeOut(700);
  $('.signUpButton').fadeOut(700);
});

//User Sign Up Form .on('click')
$('.userSignUpForm').hide();
$('.signUpButton').on('click', function() {
  $('.userSignUpForm').fadeIn(700);
  $('.signUpButton2').fadeIn(700);
  $('.loginButton').fadeOut(700);
  $('.signUpButton').fadeOut(700);
});


//     var baseUrl = "https://api.themoviedb.org/3/";
//     // may need ?
//
//     // construct the uri with our apikey
//     var moviesSearchUrl = baseUrl + 'search/movie?api_key=' + '';
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
