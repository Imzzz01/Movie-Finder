const OMDbApiKey = '2fee485b';

$(document).ready(function(){
    AOS.init();


$('#search-btn').click(function () {
    const query = $('#movie-search').val().trim();
    if (query === "") return;

searchMovie(query);
});

$('#dark-mode-toggle').click(function() {
    $('body').addClass('dark-mode');
    $('body').removeClass('light-mode');
});
$('#light-mode-toggle').click(function() {
    $('body').addClass('light-mode');
    $('body').removeClass('dark-mode');
});   
});


function searchMovie(query) {
    $.ajax({
        url:`https://www.omdbapi.com/`,
        method: 'GET',
        data:{
             s: query,
             apikey: '2fee485b'
        },

        success: function(data){
            console.log('Movie Search Response:', data);
            if(data.Response === "True") {
                displayMovies(data.Search);
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

        const movieCard = `
        <div class="col-md-3 col-sm-6 col-12 movie-card" data-aos="zoom-in">
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
    url:`https://www.omdbapi.com/`,
    method: 'GET',
    data:{
         i: imdbID,
         apikey: '2fee485b'
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
   
    const poster = movie.Poster !== "N/A" ? movie.Poster : './assets/images/defualt-image.jpg';
    $('#movie-details').html(`
        <img src="${poster}"alt="${movie.Title}" style="width: 300px; border-radius: 8px;">
        <h2>${movie.Title} (${movie.Year})</h2>
        <p><strong>Genre:</strong>${movie.Genre}</p>
        <p><strong>Rating:</strong>${movie.imdbRating}</p>
        <p><strong>Plot:</strong>${movie.Plot}</p>
        <button class="btn btn-outline-secondary" onclick="toggleFavorite('${movie.imdbID}','${movie.Title}')">
        ${isFavorite ? 'Remove from Favorites': 'Add to Favorites'} </button>

    `);
}

function toggleFavorite(imdbID, Title) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) ||[];
    const movieExists = favorites.some(movie => movie.traktID === traktID);
       
    if(movieExists) {
        favorites = favorites.filter(movie => movie.traktID !== traktID);
        Swal.fire('Removed!',`${title} has been removed from your favorites.`,'info');
        $('button[data-traktid = "${traktID}"]').text('Add to Favorites');
    }else {
        
        favorites.push({traktID, title});
        Swal.fire('Added!',`${title} has been added to your favorites.`, 'success');
        $('button[data-traktid = "${traktID}"]').text('Remove from Favorites');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));

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

