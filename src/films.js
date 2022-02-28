//const movies = require("./data");

// Exercise 1: Get the array of all directors.
function getAllDirectors(arrayMovies) {
  let result = arrayMovies.map( x => x.director );
  return result;
}

// Exercise 2: Get the films of a certain director
function getMoviesFromDirector(arrayMovies, director) {
  let result = arrayMovies.filter( x => x.director == director );
  return result;
}

// Exercise 3: Calculate the average of the films of a given director.
function moviesAverageOfDirector(arrayMovies, director) {
  const arrayMoviesOfDirector = getMoviesFromDirector(arrayMovies, director);
  return moviesAverage(arrayMoviesOfDirector);
}

// Exercise 3.1 moviesAverage
function moviesAverage(arrayMovies){
  /* first version */
  /* const total = arrayMovies.reduce((previous, current) => ({score: previous.score + current.score}));
  return parseFloat((total.score/arrayMovies.length).toFixed(2)); */

  /* new version for Excersie 6 considering a movie could not have a score */
  const total = arrayMovies.reduce( (previous, current) => {
    if ( current.score === undefined ) {
      return { score: previous.score };
    } else {
      return { score: Number(previous.score) + Number(current.score) };
    }
  }, {score: 0} );
  return parseFloat( ( total.score / arrayMovies.length ).toFixed(2) );
}

// Exercise 4:  Alphabetic order by title 
function orderAlphabetically([...arrayMovies]) {
  let compare = (previous,current) => {
    if(previous.title < current.title) {
      return -1;
    } else if ( previous.title > current.title ) {
      return 1;
    } else {
      return 0;
    }
  }
  let arrayMovies20 = arrayMovies.sort(compare).slice(0,20);
  // L'enunciat deia retornar objectes i no títols, però
  // Els tests demanen strings, per això ho he fet de la
  // forma complicada
  let arrayTitles = arrayMovies20.map( movies => movies.title);
  return arrayTitles;
}

// Exercise 5: Order by year, ascending
function orderByYear([...arrayMovies]) {
  let compare = (previous,current) => {
    if ( previous.year < current.year ) {
      return -1;
    } else if(previous.year > current.year) {
      return 1;
    } else{
      if ( previous.title < current.title ) {
        return -1;
      }else if ( previous.title >  current.title ) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  return arrayMovies.sort(compare);
}

// Exercise 6: Calculate the average of the movies in a category
function moviesAverageByCategory( arrayMovies, category ) {
  let arrayMoviesOfCategory = [];
  if ( category !== undefined ) {
    arrayMoviesOfCategory = arrayMovies.filter( (m) => {
      if ( m.genre === undefined ) {
        return false;
      }else{
        return m.genre.includes(category) && (m.score === Number(m.score));
      }
    });
  } else {
    arrayMoviesOfCategory = arrayMovies;
  }
  return moviesAverage(arrayMoviesOfCategory);
}

// Exercise 7: Modify the duration of movies to minutes
function hoursToMinutes(arrayMovies) {
  return arrayMovies.map( ( movie ) => { 
    const [hours = 0, minutes = 0] = movie.duration.split(' ');
    let newMovie = {...movie};
    newMovie.duration = parseInt(hours) * 60 + parseInt(minutes);
    return newMovie;
  });
}

// Exercise 8: Get the best film of a year
function bestFilmOfYear(arrayMovies, year) {
  return arrayMovies.filter( movie => movie.year == year ).sort( (prev, curr) => {
    if ( prev.score > curr.score ) {
      return -1;
    } else {
      return 1;
    }
  }).slice(0,1);
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    getMoviesFromDirector,
    moviesAverageOfDirector,
    orderAlphabetically,
    orderByYear,
    moviesAverageByCategory,
    hoursToMinutes,
    bestFilmOfYear,
  };
}
