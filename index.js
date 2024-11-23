// API base URL
const API_KEY = '3821cee171333fe0fee20ff09687cfe3';
const BASE_URL = 'https://api.themoviedb.org/3';

// Elements for each category (Popular, Animation, etc.)
const popularGrid = document.getElementById('popular-grid');
const animationGrid = document.getElementById('animation-grid');
const topRatedGrid = document.getElementById('top-rated-grid');
const upcomingGrid = document.getElementById('upcoming-grid');

// Function to toggle between light and dark modes
document.getElementById('theme-toggle').addEventListener('click', function () {
  document.body.classList.toggle('light-mode');
});

// Function to fetch movies for a category and display them in a horizontal scroll (index page)
async function fetchMovies(url, containerId) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const movies = data.results;

    // Empty the container before adding new movies
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    movies.forEach(movie => {
      // Calculate rating percentage (assuming rating is between 0 and 10)
      const ratingPercentage = Math.round(movie.vote_average * 10);
      
      // Format the release date
      const releaseDate = new Date(movie.release_date).toLocaleDateString();

      // Create movie card
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');
      
      movieCard.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <div class="movie-info">
          <p class="rating">Rating: ${ratingPercentage}%</p>
          <p class="release-date">Release Date: ${releaseDate}</p>
        </div>
      `;
      
      // Append the movie card to the container
      container.appendChild(movieCard);
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

// Function to fetch and display movies for a category page (grid layout)
// Function to fetch and display movies for a category (index page or category page)
async function fetchMovies(url, containerId) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const movies = data.results;

    // Empty the container before adding new movies
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    movies.forEach(movie => {
      // Calculate rating percentage (assuming rating is between 0 and 10)
      const ratingPercentage = Math.round(movie.vote_average * 10);
      
      // Format the release date
      const releaseDate = new Date(movie.release_date).toLocaleDateString();

      // Create movie card
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');

      // Add a clickable link to the movie card
      movieCard.innerHTML = `
        <div onclick="location.href='details.html?movieId=${movie.id}'">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <div class="movie-info">
            <p class="rating">Rating: ${ratingPercentage}%</p>
            <p class="release-date">Release Date: ${releaseDate}</p>
          </div>
        </div>
      `;
      
      // Append the movie card to the container
      container.appendChild(movieCard);
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}


// Function to fetch and display a movie's details (for details page)
async function fetchMovieDetails(movieId) {
  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const movie = await response.json();

    // Format the release date
    const releaseDate = new Date(movie.release_date).toLocaleDateString();

    // Calculate rating percentage
    const ratingPercentage = Math.round(movie.vote_average * 10);

    // Update the movie details section (e.g., backdrop image, title, rating, and description)
    const movieDetailsSection = document.getElementById('movie-details');
    movieDetailsSection.innerHTML = `
      <div class="movie-card">
        <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <div class="movie-info">
          <p class="rating">Rating: ${ratingPercentage}%</p>
          <p class="release-date">Release Date: ${releaseDate}</p>
          <p class="description">${movie.overview}</p>
        </div>
      </div>
    `;
  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}

// Fetch and display popular movies (index page)
fetchMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`, 'popular-grid');

// Fetch and display animated movies (index page)
fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16`, 'animation-grid');

// Fetch and display top-rated movies (category page)
fetchCategoryMovies(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`, 'top-rated-grid');

// Fetch and display upcoming movies (category page)
fetchCategoryMovies(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`, 'upcoming-grid');
