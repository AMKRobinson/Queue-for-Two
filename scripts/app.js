'use strict';

//User Login Form .on('click')
$('.icon-button, .userLoginForm').hide();

$('.loginButton').on('click', function(event) {
  event.preventDefault();
  $('.userLoginForm, .loginButton2').fadeIn(700);

  $('.loginButton, .signUpButton').fadeOut(700);

});

//User Sign Up Form .on('click')
$('.userSignUpForm').hide();
$('.signUpButton').on('click', function(event) {
  event.preventDefault();
  $('.loginButton, .signUpButton').fadeOut(700);
  $('.userSignUpForm, .signUpButton2').fadeIn(700);

});

$('.findAMovie, .hamburgerButtons').hide();
$('.signUpButton2').on('click', function(event) {
  event.preventDefault();
  $('.findAMovie, .findAMovieLabel, .icon-button, .searchMoviesButton').fadeIn(700);
  $('.userSignUpForm').fadeOut(700);
});

//HAMBURGER MENU
$('.icon-button').on('click', function(event) {
  event.preventDefault();
  $('.hamburgerButtons').show(700).slideDown();
});//END

//FINE A MOVIE
$('.findAMovie, .hamburgerButtons').hide();
$('.loginButton2').on('click', function(event) {
  event.preventDefault();
  $('.findAMovie, .findAMovieLabel, .icon-button, .searchMoviesButton').fadeIn(700);
  $('.userLoginForm').fadeOut(700);
});//END

//SEARCH FOR MOVIES BUTTON
$('.searchMoviesButton').on('click', function(event) {
  event.preventDefault();
});//END

//YOUR TITLES
$('.yourTitlesCap, .titlesMessage').hide();

$('#yourTitlesButton').on('click', function(event) {
  event.preventDefault();
  $('.findAMovie, .othersTitlesCap, .othersTitlesMessage, .aboutUsCap').fadeOut(700);

  $('.yourTitlesCap, .titlesMessage').fadeIn(700);

});

//OTHERS' TITLES
$('.othersTitlesCap, .othersTitlesMessage').hide();
$('#othersTitlesButton').on('click', function(event) {
  event.preventDefault();
  $('.findAMovie, .yourTitlesCap, .titlesMessage, .aboutUsCap').fadeOut(700);
  $('.othersTitlesCap, .othersTitlesMessage').fadeIn(700);
});

//ABOUT US
$('.aboutUsCap, .aboutUsPg').hide();

$('#aboutUsButton').on('click', function(event) {
  event.preventDefault();
  $('.findAMovie, .yourTitlesCap, .titlesMessage, .othersTitlesCap, .othersTitlesMessage').fadeOut(700);

  $('.aboutUsCap').fadeIn(700);
});

//RETURN TO FIND A MOVIE
$('#findMovieButton').on('click', function(event) {
  event.preventDefault();
  $('.yourTitlesCap, .titlesMessage, .othersTitlesCap, .othersTitlesMessage, .aboutUsCap').fadeOut(700);

  $('.findAMovie').fadeIn(700);
});
