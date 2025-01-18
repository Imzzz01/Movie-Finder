const traktApiKey = 'd9cc9a51e007b0f3fca4b168ff6da92df12b52fe767e113e8c753bed5d340a05';

$('#search-btn').click(function () {
    const query = $('#movie-search').val().trim();
    if (query === "") return;


    $.ajax({
        url:`https://api.trakt.tv/search/movie%60,`,
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
            'trakt-api-version':'2',
            'trakt-api-key':d9cc9a51e007b0f3fca4b168ff6da92df12b52fe767e113e8c753bed5d340a05
        },
        data: {
            query: query
        },
        success: function(data){
            if(data.length> 0) {
                displayMovies(data);
            } else {
        $('#movie-results').html('<p>No movies found. Please try again.</p>');
            }
        
            },
error: function(){
    $('#movie-results').html('<p>Error fetching data. Please try again later.</p>');
}
    });
});

function displayMovies(movies) {
    $('#movie-results').empty();
    movies.forEach(movie => {
        const movieCard = `
        <div class="col-md-3 col-sm-6 col-12 movie-card">
        <img src="${movie.movie.images.poster}" alt="${movie.movie.title}">
        <h3>${movie.movie.title}</h3>
        <p>${movie.movie.year}</p>
        <button class="btn btn-outline-primary w-100" onclick="getMovieDetails('${movie.movie.ids.trakt}')">View Details</button>
        </div>
        `;
        $('#movie-results').append(movieCard);

    });
}

function getMovieDetails(traktID) {
   
    $.ajax({
        url:`https://api.trakt.tv/search/movies/${traktID},`,
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
            'trakt-api-version':'2',
            'trakt-api-key':d9cc9a51e007b0f3fca4b168ff6da92df12b52fe767e113e8c753bed5d340a05
        },
       
        success: function(data){
           showMovieDetails(data);
            },
error: function(){
    $('#movie-results').html('<p>Error fetching movie details. Please try again later.</p>');
}
    });

 

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

