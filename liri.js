require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var moment = require('moment-timezone');
moment().format();

var keys = require("./keys");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var operand = process.argv[2];

if (operand === "my-tweets") { 

client.get('statuses/user_timeline', function(error, tweets, response) {
    if (!error) {
    for (var i = 0; i < tweets.length; i++) {
      console.log(tweets[i].text + " || " + moment(tweets[i].created_at).tz("America/Los_Angeles").format("MMM Do, YYYY hh:mm:ss"));
    //   console.log(tweets[i].created_at);
      }
    }
  });
}

// var songName = process.argv[3];

if (operand === "spotify-this-song") { 

    var nodeArgs = process.argv;

    // Create an empty variable for holding the movie name
    var songName = "";
    
    // Loop through all the words in the node argument
    // And do a little for-loop magic to handle the inclusion of "+"s
    for (var i = 3; i < nodeArgs.length; i++) {
    
      if (i > 3 && i < nodeArgs.length) {
        songName = songName + "+" + nodeArgs[i];
      }
      else {
    
        songName += nodeArgs[i];
    
      }
    }
if(songName === "") {
        songName = "The Sign";
    }

spotify.search({ type: 'track', query: songName }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  else if(songName === "The Sign") {
    console.log("Artist name: " + data.tracks.items[5].artists[0].name);
    console.log("Album: " + data.tracks.items[5].album.name);
    console.log("Song name: " + data.tracks.items[5].name);
    console.log("Spotify Link: " + data.tracks.items[5].external_urls.spotify);

  }
  else {
  console.log("Artist name: " + data.tracks.items[0].artists[0].name);
  console.log("Album: " + data.tracks.items[0].album.name);
  console.log("Song name: " + data.tracks.items[0].name);
  console.log("Spotify Link: " + data.tracks.items[0].external_urls.spotify);
  }
});



}



if (operand === "movie-this") {
var request = require("request");

// Store all of the arguments in an array
var nodeArgs = process.argv;

// Create an empty variable for holding the movie name
var movieName = "";

// Loop through all the words in the node argument
// And do a little for-loop magic to handle the inclusion of "+"s
for (var i = 3; i < nodeArgs.length; i++) {

  if (i > 3 && i < nodeArgs.length) {

    movieName = movieName + "+" + nodeArgs[i];

  }

  else {

    movieName += nodeArgs[i];

  }
}
// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
if(movieName === ""){
    queryUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&y=&plot=short&apikey=trilogy";
}

request(queryUrl, function(error, response, body) {

  if (!error && response.statusCode === 200) {


    console.log("Title: " + JSON.parse(body).Title);
    console.log("Release Year: " + JSON.parse(body).Year);
    console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes: " + JSON.parse(body).Ratings[1].Value);
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language: " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }

});


}

if (operand === "do-what-it-says") {
    var fs = require("fs");
    fs.readFile("random.txt", "utf-8", function(error, data){
        if(error) {
            console.log(error);
        }
        var dataArr = data.split(",");
        // console.log(dataArr[0]);
        // console.log(dataArr[1]);
        spotify.search({ type: 'track', query: dataArr[1] }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
        
            console.log("Artist name: " + data.tracks.items[0].artists[0].name);
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("Song name: " + data.tracks.items[0].name);
            console.log("Spotify Link: " + data.tracks.items[0].external_urls.spotify);
          });

    });

}
 // console.log(spotify);