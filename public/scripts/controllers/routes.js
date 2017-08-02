'use strict';
var app = app || {};

page('/', app.entryPageController.loadAll, app.entryPageController.index);
page('/sign-up', app.signUpController.index);
page('/login', app.loginController.index);
page('/find-movie', app.findMovieController.index);
page('/your-titles', app.yourTitlesController.index);
page('/others-titles', app.aboutController.index);
page('/shared-titles', app.aboutController.index);
page('/about-us', app.aboutController.index);
page('/article/:article_id', app.articleController.loadById, app.articleController.index);

// Code below useful for when customer taps/clicks to comparison of their queue with other customer's?
// page('/author/:authorName', app.articleController.loadByAuthor, app.articleController.index);
// page('/category/:categoryName', app.articleController.loadByCategory, app.articleController.index);

page();
