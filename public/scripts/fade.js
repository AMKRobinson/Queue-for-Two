'use strict';

$('#about-us, .findAMovie, .yourTitlesCap, .titlesMessage, .othersTitlesCap, .othersTitlesMessage, .icon-button, .userLoginForm, .userSignUpForm, .hamburgerButtons, .findAMovie, .titlesMessage, .yourTitlesCap, .noTitlesMessage, .othersTitlesCap, .aboutUsPg, .aboutUsCap, #customers').hide();

$('.loginButton').on('click', function(event) {
  event.preventDefault();
  $('.loginButton, .signUpButton').fadeOut(700);
  $('.userLoginForm, .loginButton2').delay(700).fadeIn(700);
});

$('.signUpButton').on('click', function(event) {
  event.preventDefault();
  $('.loginButton, .signUpButton').fadeOut(700);
  $('.userSignUpForm, .signUpButton2').delay(700).fadeIn(700);
});

$('.signUpButton2').on('click', function(event) {
  $('.userSignUpForm').fadeOut(700);
  $('.findAMovie, .findAMovieLabel, .icon-button, .searchMoviesButton').delay(700).fadeIn(700);
});

//FIND A MOVIE
$('.loginButton2').on('click', function() {
  console.log()
  $('.userLoginForm').fadeOut(700);
  $('.findAMovie, .findAMovieLabel, .icon-button, .searchMoviesButton, #out').delay(700).fadeIn(700);
});//END

//HAMBURGER MENU
$('.icon-button').on('click', function(event) {
  event.preventDefault();
  $('.hamburgerButtons').fadeToggle(700);
});//END


//YOUR TITLES
$('#yourTitlesButton').on('click', function(event) {
  event.preventDefault();
  $('.findAMovie, .othersTitlesCap, .othersTitlesMessage, .aboutUsCap, .aboutUsPg').fadeOut(700);
  $('.yourTitlesCap, .titlesMessage').delay(700).fadeIn(700);
});//END

//OTHERS' TITLES
$('#othersTitlesButton').on('click', function(event) {
  event.preventDefault();
  $('#about-us, .findAMovie, .yourTitlesCap, .titlesMessage, .aboutUsCap, .aboutUsPg, #out').fadeOut(700);
  $('.othersTitlesCap, .othersTitlesMessage, #customers').delay(700).fadeIn(700);
});//END

//ABOUT US
$('#aboutUsButton').on('click', function(event) {
  event.preventDefault();
  $('#out, .findAMovie, .yourTitlesCap, .titlesMessage, .othersTitlesCap, .othersTitlesMessage, #customers').fadeOut(700);
  $('#about-us, .aboutUsCap, .aboutUsPg').delay(700).fadeIn(700);
});

//SEARCH MOVIES
$('#searchMoviesButton').on('click', function(event) {
  event.preventDefault();
  $('#out').fadeIn(700);
});

//RETURN TO FIND A MOVIE
$('#findMovieButton').on('click', function(event) {
  event.preventDefault();
  $('#about-us, .yourTitlesCap, .titlesMessage, .othersTitlesCap, .othersTitlesMessage, .aboutUsCap, .aboutUsPg, #customers').fadeOut(700);
  $('.findAMovie').delay(700).fadeIn(700);
});
