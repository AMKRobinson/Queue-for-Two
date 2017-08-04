'use strict';

//User Login Form .on('click')
$('.icon-button, .userLoginForm, .userSignUpForm, .hamburgerButtons, .findAMovie, .titlesMessage, .yourTitlesCap, .noTitlesMessage, .othersTitlesCap, .aboutUsPg, .aboutUsCap, #customers').hide();
// $('.icon-button, .userLoginForm').hide();
$('.loginButton').on('click', function(event) {
  event.preventDefault();
  $('.loginButton, .signUpButton').fadeOut(700);
  $('.userLoginForm, .loginButton2').delay(700).fadeIn(700);
});

//User Sign Up Form .on('click')
// $('.userSignUpForm').hide();
$('.signUpButton').on('click', function(event) {
  event.preventDefault();
  $('.loginButton, .signUpButton').fadeOut(700);
  $('.userSignUpForm, .signUpButton2').delay(700).fadeIn(700);

});

// $('.findAMovie, .hamburgerButtons').hide();
$('.signUpButton2').on('click', function(event) {
  // event.preventDefault();
  $('.userSignUpForm').fadeOut(700);
  $('.findAMovie, .findAMovieLabel, .icon-button, .searchMoviesButton').delay(700).fadeIn(700);
});

//FINE A MOVIE
// $('.findAMovie, .hamburgerButtons').hide();
$('.loginButton2').on('click', function() {
  // event.preventDefault();
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
// $('.yourTitlesCap, .titlesMessage').hide();
$('#yourTitlesButton').on('click', function(event) {
  event.preventDefault();
  $('.findAMovie, .othersTitlesCap, .othersTitlesMessage, .aboutUsCap, .aboutUsPg').fadeOut(700);
  $('.yourTitlesCap, .titlesMessage').delay(700).fadeIn(700);
});//END

//OTHERS' TITLES
// $('.othersTitlesCap, .othersTitlesMessage, .noTitlesMessage, .aboutUsCap, .aboutUsPg').hide();
$('#othersTitlesButton').on('click', function(event) {
  event.preventDefault();
  $('.findAMovie, .yourTitlesCap, .titlesMessage, .aboutUsCap, .aboutUsPg, #out').fadeOut(700);
  $('.othersTitlesCap, .othersTitlesMessage, #customers').delay(700).fadeIn(700);
  //Haven't yet made a condition for the .noTitlesMessage to be shown yet
});//END

//ABOUT US
// $('.aboutUsCap, .aboutUsPg').hide();
$('#aboutUsButton').on('click', function(event) {
  event.preventDefault();
  $('.findAMovie, .yourTitlesCap, .titlesMessage, .othersTitlesCap, .othersTitlesMessage, #customers').fadeOut(700);
  $('.aboutUsCap, .aboutUsPg').delay(700).fadeIn(700);
});

//SEARCH MOVIES
$('#searchMoviesButton').on('click', function(event) {
  event.preventDefault();
});

//RETURN TO FIND A MOVIE
$('#findMovieButton').on('click', function(event) {
  event.preventDefault();
  $('.yourTitlesCap, .titlesMessage, .othersTitlesCap, .othersTitlesMessage, .aboutUsCap, .aboutUsPg, #customers').fadeOut(700);
  $('.findAMovie').delay(700).fadeIn(700);
});
