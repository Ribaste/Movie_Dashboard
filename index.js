const API_KEY = '3821cee171333fe0fee20ff09687cfe3';
const BASE_URL = 'https://api.themoviedb.org/3';

const popularGrid = document.getElementById('popular-grid');
const animationGrid = document.getElementById('animation-grid');
const topRatedGrid = document.getElementById('top-rated-grid');
const upcomingGrid = document.getElementById('upcoming-grid');

const darkModeToggle = document.getElementById('darkModeToggle');
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkModeToggle.checked = true;
}
darkModeToggle.addEventListener('change', () => {
  if (darkModeToggle.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
  }
});

async function fetchMovies(url, containerId) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const movies = data.results;
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    movies.forEach(movie => {
      const ratingPercentage = Math.round(movie.vote_average * 10);
      const releaseDate = new Date(movie.release_date).toLocaleDateString();
      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');

      movieCard.innerHTML = `
        <div onclick="location.href='details.html?movieId=${movie.id}'">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <h3>${movie.title}</h3>
          <div class="movie-info">
            <p class="rating">Rating: ${ratingPercentage}%</p>
            <p class="release-date">${releaseDate}</p>
          </div>
        </div>
      `;
      container.appendChild(movieCard);
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
}

fetchMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`, 'popular-grid');
fetchMovies(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16`, 'animation-grid');
fetchMovies(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`, 'top-rated-grid');
fetchMovies(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`, 'upcoming-grid');


document.getElementById('search-button').addEventListener('click', handleSearch);
document.getElementById('search-input').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    handleSearch();
  }
});

function handleSearch() {
  const query = document.getElementById('search-input').value.trim();
  if (query) {
    window.location.href = `category.html?category=search&query=${encodeURIComponent(query)}`;
  }
}
