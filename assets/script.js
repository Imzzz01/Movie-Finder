
const OMDbApiKey = '2fee485b';


$(document).ready(function() {

    if(localStorage.getItem('dark-mode')==='enabled'){
        $('body').addClass('dark-mode');
        $('#dark-mode-toggle').text('Light Mode');

    } else {
        $('#dark-mode-toggle').text('dark-mode');
    } 

    $('#dark-mode-toggle').click(function() {
    $('body').toggleClass('dark-mode');

    if ($('body').hasClass('dark-mode')) {
        $('#dark-mode-toggle').text('Light Mode');
        localStorage.setItem('dark-mode','enabled');

    } else {
        $('#dark-mode-toggle').text('dark-mode');
        localStorage.removeItem('dark-mode');
    }
});
});

updateFavoriteCount();


function updateFavoriteCount() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    $('#favorites-count').text(favorites.length);
}

$('#search-btn').click(function () {
    const query = $('#movie-search').val().trim();
    if (query !== "") {
          searchMovie(query);
}
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
        const poster = movie.Poster!== "N/A" ? movie.Poster : './assets/images/default-image.jpg';

        const movieCard = `
        <div class="col-md-3 col-sm-6 col-12 movie-card" data-aos="zoom-in">
        <img src="${poster}" alt="${movie.Title}">
        <h3>${movie.Title}</h3>
        <p>${movie.Year}</p>
        <button class="btn btn-outline-primary w-100" onclick="getMovieDetails('${movie.imdbID}')">View Details</button>
        </div>
        `;

        $('#movie-results').append(movieCard);

    });
}
function getMovieDetails(imdbID) {
 
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
        <button class="btn btn-outline-secondary" onclick="toggleFavorite('${movie.imdbID}', '${movie.Title.replace(/'/g, "\\'")}')">
        ${isFavorite(movie.imdbID) ? 'Remove from Favorites': 'Add to Favorites'} </button>
   <br><br>
        <button class="btn btn-primary" onclick="backToMovies()">Back to Movies</button>     
        </div>

    `);
        $('#movie-results').hide();
        $('#movie-details').html();
       
    
    }
    function backToMovies() {
        $('#movie-results').show();
        $('#movie-details').empty();
    }
    


function toggleFavorite(imdbID, title) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) ||[];
    const movieExists = favorites.some(movie => movie.imdbID === imdbID);
       
    if(movieExists) {
        favorites = favorites.filter(movie => movie.imdbID !== imdbID);
        Swal.fire('Removed!',`${title} has been removed from your favorites.`,'info');
       
    }else {
        
        favorites.push({imdbID, title});
        Swal.fire('Added!',`${title} has been added to your favorites.`, 'success');
       
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));

}

function isFavorite(imdbID) {
         let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
         return favorites.some(movie => movie.imdbID === imdbID);
}
