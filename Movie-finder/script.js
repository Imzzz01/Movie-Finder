const omdbApikey = 'your_omdb_api_key';

$('#search-btn').click(function () {
    const query = $('#movie-search').val().trim();
    if (query === "") return;

    $.getJSON(`https://www.omdbapi.com/?apikey=${omdbApikey}&s=${query}`,function(data) {
        if(data.Response === "True") {
            displayMovies(data.Search);  
        
    } else {
        $('#movie-results').html('<p>No movies found. Please try again.</p>');

    }
}).fail(function() {
     $('#movie-results').html('<p>Error fetching data. Please try again later. </p>');

});
});

function displayMovies(movies) {
    $('#movie-results').empty();
    movies.forEach(movie => {
        const movieCard = `
        <div class="col-md-3 col-sm-6 col-12 movie-card">
        <img src="${movie.Poster}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>${movie.year}</p>
        <button class="btn btn-outline-primary w-100" onclick="getMovieDetails('${movie.omdbID}')">View Details</button>
        </div>
        `;
        $('#movie-results').append(movieCard);

    });
}

function getMovieDetails(omdbID) {
    $.getJSON(`https://www.omdbapi.com/?apikey=${omdbApikey}&i=${omdbID}`, function(data){
        if(data.Response === "True") {
            showMovieDetails(data);

        }
    }).fail(function() {
       $('#movie-details').html('<p>Error fetching movie details. Please try again later.</p>');

    });

    const omdbUrl = `https://omdbapi-com/${omdbApikey}/title/${omdbID}`;
    fetch(omdbUrl)
    .then((response) => response.json())
    .then((data) =>{
         console.log("OMDB Movie Deatils:",data);

})
    .catch((error) => console.log(error));

}

function showMovieDetails(movie) {
    $('#movie-details').show().html(`
        <img src="${movie.poster}"alt="${movie.Title}">
        <h2>${movie.title} (${movie.Year})<h2>
        <p><strong>Genre:</strong>${movie.Genre}</p>
        <p><strong>Rating:</strong>${movie.imdbRating}</p>
        <p><strong>Plot:</strong>${movie.Poster}</p>
        <button onclick="toggleFavorite('${movie.omdbID}','${movie.Title}')"class="btn btn-outline-secondary">Add to Favorites</button>

    `);
}

function toggleFavorite(omdbID, title) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) ||[];
    if(favorites.some(movie => movie.omdbID === omdbID)){
        favorites = favorites.filter(movie => movie.omdbID !== omdbID);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
        favorites.push({omdbID, title});
        localStorage.setItem('favorites',JSON.stringify(favorites));

    }
}
function getPersonDetails(personid){
    const omdbUrl = `https://omdbapi.com/${omdbApikey}/Name/${personid}`;
    fetch(omdbUrl)
    .then((response) => response.json())
    .then((data) =>{
         console.log("OMDB Person Details:",data);

})
    .catch((error) => console.log(error));

}

function searchMovie(query) {
    const omdbUrl = `https://omdbapi.com/${omdbApikey}/Search/${query}`;
    fetch(omdbUrl)
    .then((response) => response.json())
    .then((data) =>{
         console.log("OMDB Search Results:",data);

})
    .catch((error) => console.log(error));

}

