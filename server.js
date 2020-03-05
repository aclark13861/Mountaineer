var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');
var mongoose = require('mongoose');

var request = require('request');

// var citySchema = new mongoose.Schema({
//   name: String
// });

// var cityModel = mongoose.model('City', citySchema);

// var Denver = new cityModel({name: 'Denver'});
// Denver.save()

// async function getWeather(cities) {
//   var weather_data = []
//   for (var city_obj of cities) {
//     var city = city_obj.name;
//     var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4d9e712dd8becce5acc4a38753cdbb26`

//     var response_body = await request(url);
//     var weather_json = JSON.parse(response_body)
//     var weather = {
//       city: city,
//       temperature: Math.round(weather_json.main.temp),
//       description: weather_json.weather[0].description,
//       icon: weather_json.weather[0].icon
//     };
//     weather_data.push(weather);
//   }
//   return weather_data;
// }


// var city = 'Denver'


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var trailsRouter = require('./routes/trails');
var reviewsRouter = require('./routes/reviews');

var app = express();

// app.get('/users', function(req, res) {
//   cityModel.find({}, function(err, cities) {
    
//     getWeather(cities).then(function(results) {
//       var weather_data = {weather_data: results};
//       res.render('users/index', {
//         user: req.user,
//         weather_data
//     });
//   });
  //request(url, function(err, response, body) {
    //weather_json = JSON.parse(body);
    //console.log(weather_json)
// });
// });

require('dotenv').config();
require('./config/database');
require('./config/passport');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'Mountaineer is hard',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/', trailsRouter);
app.use('/', reviewsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
