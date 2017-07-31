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
