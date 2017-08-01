'use strict';

//User Login Form .on('click')

$('.icon-button').hide();
$('.userLoginForm').hide();
$('.loginButton').on('click', function(event) {
  event.preventDefault();

$('.userLoginForm').hide();
$('.loginButton').on('click', function() {

  $('.userLoginForm').fadeIn(700);
  $('.loginButton2').fadeIn(700);
  $('.loginButton').fadeOut(700);
  $('.signUpButton').fadeOut(700);
});

//User Sign Up Form .on('click')
$('.userSignUpForm').hide();

$('.signUpButton').on('click', function(event) {
  event.preventDefault();

$('.signUpButton').on('click', function() {

  $('.userSignUpForm').fadeIn(700);
  $('.signUpButton2').fadeIn(700);
  $('.loginButton').fadeOut(700);
  $('.signUpButton').fadeOut(700);
});


// $('.yourTitlesButton').hide();
// $('othersTitlesButton').hide();
// $('.aboutUs').hide();
$('.findAMovie').hide();
$('.hamburgerButtons').hide();
$('.signUpButton2').on('click', function(event) {
  event.preventDefault();
  $('.findAMovie').fadeIn(700);
  $('.findAMovieLabel').fadeIn(700);
  $('.icon-button').fadeIn(700);
  $('.searchMoviesButton').fadeIn(700);
  $('.userSignUpForm').fadeOut(700);
});

//HAMBURGER MENU
$('.icon-button').on('click', function(event) {
  event.preventDefault();
  $('.hamburgerButtons').show(700).slideDown();
});//END

//FINE A MOVIE
$('.findAMovie').hide();
$('.hamburgerButtons').hide();
$('.loginButton2').on('click', function(event) {
  event.preventDefault();
  $('.findAMovie').fadeIn(700);
  $('.findAMovieLabel').fadeIn(700);
  $('.icon-button').fadeIn(700);
  $('.searchMoviesButton').fadeIn(700);
  $('.userLoginForm').fadeOut(700);
});//END

//SEARCH FOR MOVIES BUTTON
$('.searchMoviesButton').on('click', function(event) {
  event.preventDefault();
});//END

//YOUR TITLES
$('.yourTitlesCap').hide();
$('.titlesMessage').hide();
$('#yourTitlesButton').on('click', function(event) {
  event.preventDefault();
  $('.findAMovie').fadeOut(700);
  $('.othersTitlesCap').fadeOut(700);
  $('.othersTitlesMessage').fadeOut(700);
  $('.aboutUsCap').fadeOut(700);
  $('.yourTitlesCap').fadeIn(700);
  $('.titlesMessage').fadeIn(700);
});

//OTHERS' TITLES
$('.othersTitlesCap').hide();
$('.othersTitlesMessage').hide();
$('#othersTitlesButton').on('click', function(event) {
  event.preventDefault();
  $('.findAMovie').fadeOut(700);
  $('.yourTitlesCap').fadeOut(700);
  $('.titlesMessage').fadeOut(700);
  $('.othersTitlesCap').fadeIn(700);
  $('.aboutUsCap').fadeOut(700);
  $('.othersTitlesMessage').fadeIn(700);
});

//ABOUT US
$('.aboutUsCap').hide();
$('.aboutUsPg').hide();
$('#aboutUsButton').on('click', function(event) {
  event.preventDefault();
  $('.findAMovie').fadeOut(700);
  $('.yourTitlesCap').fadeOut(700);
  $('.titlesMessage').fadeOut(700);
  $('.othersTitlesCap').fadeOut(700);
  $('.othersTitlesMessage').fadeOut(700);
  $('.aboutUsCap').fadeIn(700);
});

//RETURN TO FIND A MOVIE
$('#findMovieButton').on('click', function(event) {
  event.preventDefault();
  $('.yourTitlesCap').fadeOut(700);
  $('.titlesMessage').fadeOut(700);
  $('.othersTitlesCap').fadeOut(700);
  $('.othersTitlesMessage').fadeOut(700);
  $('.aboutUsCap').fadeOut(700);
  $('.findAMovie').fadeIn(700);
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

