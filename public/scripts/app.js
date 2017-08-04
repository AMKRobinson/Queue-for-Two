'use strict';

$('.userSignUpForm').on('submit', function(event){
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

$('.userLoginForm').on('submit', function(event) {
  event.preventDefault();

  let data = {}
  data.username = event.target.loginInName.value
  data.password = event.target.userPasswordExisting.value
  $.get('/users')
  .then(res => {
    let user = res.filter(ele => {
      return (ele.username === data.username && ele.password === data.password)
    })
    console.log('string signed in user', user)
    localStorage.setItem('user', JSON.stringify(user[0]))
  })
  console.log(data);
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

// functionality for user queue comparison
$('#customers').on('click', '.customer', function(event){
  $('.movieDiv').html('');
  event.preventDefault();
  console.log(this.id);
  let data = {
    other_customer_id: parseInt(this.id),
    current_customer_id: JSON.parse(localStorage.user).customer_id
  }

  var template = Handlebars.compile($('.handlebarTemplate').text());

  //this shortens the date which is in YYYY-MM-DD to just YYYY
  Handlebars.registerHelper('tvD', function(date) {
    if (date && date.length > 4)
      return date.substring(0,4);
    return date;
  });

  console.log('data ', data);
// content in this functionality = response in the other func
  $.get('/media-matches', data, function (response) {
    Promise.all(response.rows.map(function(apiURL) {
      return $.get('/themoviedb2', apiURL)
    })).then(function(content){
      content.forEach(function(element){
        console.log(element);
        var medias = {
          movieid: element.id, media_type: element.media_type, movieTitle: element.title, showTitle: element.name, tvDate: element.first_air_date, movieDate: element.release_date, poster_path: element.poster_path, overview: element.overview, votes: element.vote_count
        }
        console.log(medias);
        $('#customers').append(template(medias));
      })
    })
  });
});
