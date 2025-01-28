#README: CineLens(127.0.0.1:5500) [CineLens]

Purpose of project 
The goal of CineLens is to create a user-friendly, interactive movie discovery platform that offers a variety of features inspiring popular movie-related websites like IMDb, trakt.tv etc. The platform will not only help users find and explore movies, but also allow them to manage their movie preferences, watch trailers, track their favourites, and create a more personalised movie experience.

Features and functionalities:
• Movie search and Discovery:
  • Users can search for movies by title 
  • Movie suggestions and autocomplete feature for search bar.
  • Display movie details including title, year of release, genres, rating, plot, etc.

• User Interaction and Engangement:
  • light and Dark mode toggle for better user experience 
  • Interactive movie cards with hover animations.
  • Movie posters, Descriptions, and ratings for each search result.

• Detailed Movie Information:
  • Click on any movie to view more detailed information such as:
  • Genre
  • Release year 
  • Plot summary 
  • Cast and crew details 
  • Movie trailer 
  • Gallary of Images

• User Favorites and Wish List: 
  • Add movies to favorites and track what movies the user likes.
  • Remove from favorites functionality 
  • Movies are stored in in browsers localStorage for persistence.
 
• User Accounts : 
  • Users can signup, login and maintain a personalised account.
  • Once Logged in, users can:
  • Save Favorite movies to their profile
  • Access a personal Watchlist to keep track of movies they want to watch in the future.

• Movie trailers and external links:
  • Watch trailers directly within the app.
  • Provide external links to buy or download the movie from third party services like Netflix, Amazon, etc.
  
• Corousel for featured movies: 
  • Dynamic corousel showing featured, trending or top-rated movies
  • The corousel can be clicked to navigate to movie details directly.

• Interactive UI Components: 
  • Mobile-responsive layout 
  • Enhanced animations and transitions for smooth user experience.
  • A variety of interactive UI elements including buttons, sliders, carousels and modals.

Technologies Used : 

• Front End 
  • HTML5 : For structuring the web pages
  • CSS3 : For styling and making the website responsive
  • Javascript (jQuery) : for interactivity and DOM manipulation 
  • Bootsrap : For a responsive and sleek design
  • AOS : (Animate on scroll) : For smooth scrolling animations.
  • swiper : For creating the movie carousel.
  • noUiSlider : For interactive movie filters( rating, release year, etc)
  • Lottie.js : For animations and loading visuals.

• API's 
  • Trakt Tv API : For movie data, including movie titles, images, ratings, and other details. 
  • SweetAlert : For displaying notifications when adding or removing movies from favourites.

• Back End
  • LocalStorage is used for storing user favorites, ensuring data persistence even after page refresh.

Future Enhancements: 

User Authentication 
  • Implement user Login, sign-up authentication using firebase and another backend service.
Movie rating System: 
  • Allow users to rate movies display average ratings
Personalised Movie Recommendation:
  • Implement a recommendation sytem based on user preferences, watch history, of similar genres.
Improved Movie details:
  • Add features like movie reviews, box office data, steaming availability etc
Integration and external API's
  

