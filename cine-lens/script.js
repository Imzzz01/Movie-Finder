import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut}from'https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js';

const auth = getAuth();

$('#login-form').submit(function (e) {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();

    signInWithEmailAndPassword(auth, email, password)
    .then((user)
    $('#signout-btn').click(function(){
        signOut(auth)
        .then(() => {
            $('#auth-container').show();
            $('#signout-btn').hide();
            Swal.fire('Logged out!', 'You have successfully logged out.', 'info');
        })
        .catch((error) => {
            Swal.fire('Error', error.message, 'error');
        });
    });



const OMDbApiKey = '2fee485b';

$(document).ready(function(){
    AOS.init();


$('#search-btn').click(function () {
    const query = $('#movie-search').val().trim();
    if (query === "") return;

searchMovie(query);
});


   $('#light-mode-toggle').click(function() {
    $('body').addClass('dark-mode').removeClass('light-mode');
    
});
$('#dark-mode-toggle').click(function() {
    $('body').removeClass('light-mode').addClass('dark-mode');
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
        ${isFavorite(movie.imdbID) ? 'Remove from Favorites': 'Add to Favorites'} </button>

    `);
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

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 10,
    loop: true

});