const traktApiKey = 'd9cc9a51e007b0f3fca4b168ff6da92df12b52fe767e113e8c753bed5d340a05';

$('#search-btn').click(function () {
    const query = $('#movie-search').val().trim();
    if (query === "") return;

searchMovie(query);
});
function searchMovie(query) {
    $.ajax({
        url:`https://api.trakt.tv/search/movie`,
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
            'trakt-api-version':'2',
            'trakt-api-key':'d9cc9a51e007b0f3fca4b168ff6da92df12b52fe767e113e8c753bed5d340a05'
        },
        data: {
            query: query
        },
        success: function(data){
            console.log('Movie Search Response:', data);
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
};

function displayMovies(movies) {
    $('#movie-results').empty();
    movies.forEach(movie => {
        const poster = movie.movie.images && movie.movie.images.poster ? movie.movie.images.poster : './assets/images/default-image.jpg';
        console.log('Movie Poster:', poster);
        const movieCard = `
        <div class="col-md-3 col-sm-6 col-12 movie-card">
        <img src="${poster}" alt="${movie.movie.title}">
        <h3>${movie.movie.title}</h3>
        <p>${movie.movie.year}</p>
        <button class="btn btn-outline-primary w-100" onclick="getMovieDetails('${movie.movie.ids.trakt}')">View Details</button>
        </div>
        `;
        $('#movie-results').append(movieCard);

    });
}

function getMovieDetails(traktID) {
   console.log(`Fetching details for movie with traktID: ${traktID}`);
    $.ajax({
        url:`https://api.trakt.tv/movies/${traktID}`,
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
            'trakt-api-version':'2',
            'trakt-api-key':'d9cc9a51e007b0f3fca4b168ff6da92df12b52fe767e113e8c753bed5d340a05'
        
        },
        
        success: function(data){
            console.log('Movie Details Response:', data);
           showMovieDetails(data);
          
        },
    
    
error: function(){
    $('#movie-results').html('<p>Error fetching movie details. Please try again later.</p>');
}
    });

}

function showMovieDetails(movie) {
    const genres = Array.isArray(movie.genres) && movie.genres.length > 0 ? movie.genres.join(',') : 'No genres available';
    const poster = movie.images ? movie.images.poster : './assets/images/default-image.jpg';
    $('#movie-details').show().html(`
        <img src="${poster}"alt="${movie.title}">
        <h2>${movie.title} (${movie.year})</h2>
        <p><strong>Genre:</strong>${movie.genres.join(',')}</p>
        <p><strong>Rating:</strong>${movie.rating}</p>
        <p><strong>Plot:</strong>${movie.overview}</p>
        <button onclick="toggleFavorite('${movie.ids.trakt}','${movie.title}')"class="btn btn-outline-secondary">Add to Favorites</button>

    `);
}

function toggleFavorite(traktID, title) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) ||[];
    if(favorites.some(movie => movie.traktID === traktID)){
        favorites = favorites.filter(movie => movie.traktID !== traktID);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    } else {
        favorites.push({traktID, title});
        localStorage.setItem('favorites',JSON.stringify(favorites));

    }
}
function getMovieCrew (traktID) {
    $.ajax({
        url:`https://api.trakt.tv/search/movies/${traktID}/people`,
        method: 'GET',
        headers:{
            'Content-Type':'application/json',
            'trakt-api-version':'2',
            'trakt-api-key':'d9cc9a51e007b0f3fca4b168ff6da92df12b52fe767e113e8c753bed5d340a05'
        },
       
        success: function(data){
           console.log("Trakt Movie Crew Details", data);
            },
error: function(){
    console.log('Error fetching crew details.');
}
    });
}

