'use strict';

$('.userSignUpForm').on('submit', function(event){
  console.log('ksdfjgdf')
  event.preventDefault();
  let data = {}
  data.username = event.target.userName.value
  data.name = event.target.name.value
  data.email = event.target.email.value
  data.password = event.target.password.value
  $.post('/customers', data)
  .then(res => {
    console.log(res)
  })
  console.log(data);
})

//User Login Form .on('click')
// $('.icon-button, .userLoginForm').hide();
$('.userLoginForm').on('submit', function(event) {
  event.preventDefault();
// $('.userLoginForm, .loginButton2').fadeIn(700);
// $('.loginButton, .signUpButton').fadeOut(700);
  let data = {}
  data.username = event.target.loginInName.value
  data.password = event.target.userPasswordExisting.value
  $.get('/users')
  .then(res => {
    let user = res.filter(ele => {
      return (ele.username === data.username && ele.password === data.password)
    })
    console.log(user)
    localStorage.setItem('user', JSON.stringify(user[0]))
  })
  console.log(data);
});

//User Sign Up Form .on('click')
$('.userSignUpForm').hide();
$('.signUpButton').on('click', function(event) {
  event.preventDefault();
  $('.userSignUpForm, .signUpButton2').fadeIn(700);
  $('.loginButton, .signUpButton').fadeOut(700);

});

// $('.findAMovie, .hamburgerButtons').hide();
// $('.userSignUpForm').on('submit', function(event) {
//   event.preventDefault();
//   $('.findAMovie, .findAMovieLabel, .icon-button, .searchMoviesButton').fadeIn(700);
//   $('.userSignUpForm').fadeOut(700);
// });

//FINE A MOVIE
// $('.findAMovie, .hamburgerButtons').hide();
// $('.loginButton2').on('click', function(event) {
//   event.preventDefault();
//   $('.findAMovie, .findAMovieLabel, .icon-button, .searchMoviesButton').fadeIn(700);
//   $('.userLoginForm').fadeOut(700);
// });//END

//HAMBURGER MENU
$('.icon-button').on('click', function(event) {
  event.preventDefault();
  $('.hamburgerButtons').show(700).slideDown();
});//END


//YOUR TITLES
$('.yourTitlesCap, .titlesMessage').hide();
$('#yourTitlesButton').on('click', function(event) {
  event.preventDefault();
  $('.findAMovie, #customers, .aboutUsCap, .aboutUsPg').fadeOut(700);
  $('.yourTitlesCap, .titlesMessage').fadeIn(700);
});//END

//OTHERS' TITLES
$('#customers, .noTitlesMessage, .aboutUsCap, .aboutUsPg').hide();
$('#othersTitlesButton').on('click', function(event) {
  event.preventDefault();
  $('.findAMovie, .yourTitlesCap, .titlesMessage, .aboutUsCap, .aboutUsPg').fadeOut(700);
  $('#customers').fadeIn(700);
  //Haven't yet made a condition for the .noTitlesMessage to be shown yet
});//END

//ABOUT US
$('.aboutUsCap, .aboutUsPg').hide();
$('#aboutUsButton').on('click', function(event) {
  event.preventDefault();
  $('.findAMovie, .yourTitlesCap, .titlesMessage, .othersTitlesCap, .othersTitlesMessage').fadeOut(700);
  $('.aboutUsCap, .aboutUsPg').fadeIn(700);
});

//SEARCH MOVIES
$('#searchMoviesButton').on('click', function(event) {
  event.preventDefault();
  var query =  encodeURI($('#movieSearch').val());

  var template = Handlebars.compile($('.handlebarTemplate').text());

//this shortens the date which is in YYYY-MM-DD to just YYYY
  Handlebars.registerHelper('tvD', function(date) {
    if (date && date.length > 4)
      return date.substring(0,4);
    return date;
  });

  $('#out').html('');
  $.get('/themoviedb', {data:query}).done(function (response) {
    console.log(query);
    console.log(response);
    let weird = (results) => {
      response.results.map(response => {
        var info = {movieid: response.id, media_type: response.media_type, movieTitle: response.title, showTitle: response.name, tvDate: response.first_air_date, movieDate: response.release_date, poster_path: response.poster_path, overview: response.overview, votes: response.vote_count}
        console.log(info)
        $('#out').append(template(info))
      })
    }
    weird(response);
  });
});

$(document).on('click','.movieDiv',function(){
  console.log(this.id);
  let data = {
    customer_id: JSON.parse(localStorage.user).customer_id,
    url_string: this.id
  }
  $.post('/media', data)
  .then(res => console.log(res))
});

$(document).on('click','.posters', function(){
  $(this).css('border','solid');
  $(this).css('border-color','red');
});

// functionality for rendering customers to Others' Titles
const render = function(customer) {
  let template = Handlebars.compile($('#customer-template').text());

  return template(customer);
};

$.get('/users', function(response) {
  console.log(response);
  response.forEach(function(element){
    $('#customers').append(render(element))
    console.log(element.username);
  });
});

// functionality for rendering current customer's queue to Your Titles
const queueRender = function(customer) {
  let template = Handlebars.compile($('#test-template').text());

  return template(customer);
};

$('#yourTitlesButton').on('click', function(){
  let data = {
    customer_id: JSON.parse(localStorage.user).customer_id
  }
  console.log(data);

  $.get('/user-queue', function(data) {
    console.log(data);
    data.forEach(function(element){
      $('#your-titles').append(queueRender(element))
      console.log(element.url_string);
    });
  });
});

// functionality for user queue comparison
$('#customers').on('click', '.customer', function(event){
  event.preventDefault();
  console.log(this.id);
  let data = {
    other_customer_id: parseInt(this.id),
    current_customer_id: JSON.parse(localStorage.user).customer_id
  }
  // var query = $('#movieSearch').val();

  var template = Handlebars.compile($('.handlebarTemplate').text());

//this shortens the date which is in YYYY-MM-DD to just YYYY
  // Handlebars.registerHelper('tvD', function(date) {
  //   if (date && date.length > 4)
  //     return date.substring(0,4);
  //   return date;
  // });
  console.log('data ', data);

  $.get('/media-matches', data, function (response) {
    console.log(response);
    // let weird = (results) => {
    //   console.log('results: ',results);
    //   results.map(response => {
    //     var info = {movieid: response.id, media_type: response.media_type, movieTitle: response.title, showTitle: response.name, tvDate: response.first_air_date, movieDate: response.release_date, poster_path: response.poster_path, overview: response.overview, votes: response.vote_count}
    //     console.log(info)
    //     $('#customers').append(template(info))
    //   })
    // }
    // weird(response);
  });
});

// $.get('./public/data/customers.json', {data: encodeURI(query)}).done(function (response) {
//   console.log(response);
//   let customers_data = (results) => {
//     response.results.map(response => {
//       var info = {username: response.username, poster_path: response.poster_path, overview: response.overview, votes: response.vote_count}
//       console.log(info)
//       $('#customers').append(template(info))
//     })
//   }
//   customers_data(response);
// });

//RETURN TO FIND A MOVIE
$('#findMovieButton').on('click', function(event) {
  event.preventDefault();
  $('.yourTitlesCap, .titlesMessage, .othersTitlesCap, .othersTitlesMessage, .aboutUsCap, .aboutUsPg').fadeOut(700);
  $('.findAMovie').fadeIn(700);
});
