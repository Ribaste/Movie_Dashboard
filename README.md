Movie Dashboard

Project Overview
The Movie Dashboard app is a web-based application that allows users to explore popular movies, search for specific titles, and view detailed information about each movie. Users can navigate through a list of popular movies, perform keyword searches, and click on individual movie posters to view more comprehensive information, including cast details and similar movie recommendations.

Objectives
This project aims to provide users with a visually engaging and informative movie exploration tool. The application demonstrates key web development concepts, including:
- Fetching data from a public API (The Movie Database API)
- Navigating between multiple pages
- Displaying dynamically generated content
- Handling user input with search functionality
- Implementing error handling and user feedback mechanisms

Features
1. Home Page (index.html)
    - Popular Movies: The homepage displays a grid of popular movie posters fetched from TMDb. Users can browse through trending titles and click any movie poster to view more details.
    - Search Bar: A search bar at the top of the page allows users to search for specific movie titles. The results update dynamically as the user types, and a list of matching movies is displayed.
2. Details Page (details.html)
    - Movie Details: When a user clicks on a movie poster from the home page, they are redirected to a details page. This page displays a range of information about the selected movie, including title, release date, rating, genres, and a synopsis.
    - Cast Information: The details page shows a list of the main cast members for the selected movie, along with their roles and profile images.
    - Recommendations: Users are shown a list of recommended movies based on the selected title. Clicking on a recommended movie will load its details in the same format, allowing for easy exploration of similar movies.

Technologies Used
HTML: For creating the page structure and layout.
CSS: For styling the interface, including grid layouts and responsiveness.
JavaScript: For fetching data from TMDb API, handling user interactions, and dynamically updating the content.
TMDb API: A public API that provides access to movie data, including details, images, and recommendations.

API Endpoints
Popular Movies: https://api.themoviedb.org/3/movie/popular?api_key={api}
Movie Search: https://api.themoviedb.org/3/search/movie
Movie Details: https://api.themoviedb.org/3/movie/{movie_id}
Movie Cast and Crew: https://api.themoviedb.org/3/movie/{movie_id}/credits
Movie Recommendations: https://api.themoviedb.org/3/movie/{movie_id}/recommendations

Project Structure
project/
  ~ index.html     # Home Page
  ~ details.html   # Details Page
  ~ styles.css     # Shared CSS for both pages
  ~ script.js     # Javascript for Home Page
  ~ details.js     # Javascript for Details Page