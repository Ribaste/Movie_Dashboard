const API_KEY = '3821cee171333fe0fee20ff09687cfe3';
const BASE_URL = 'https://api.themoviedb.org/3';

const categoryMoviesGrid = document.getElementById('category-movies-grid');
const loadMoreButton = document.getElementById('load-more-button');
const category = new URLSearchParams(window.location.search).get('category');

const categoryTitle = document.getElementById("category");
categoryTitle.innerHTML = (category[0].toUpperCase() + category.substring(1)).replace(/_/g, " ");

let currentPage = 1;
let totalPages = 10; // This should be dynamic based on the API response

async function fetchCategoryMovies(category, page = 1) {
  let url;
  if (category === 'search' && query) {
    url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
  } else {
    url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}&page=${page}`;
  }
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
}

const renderMovies = (movies, container) => {
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
    movieCard.innerHTML = `
      <div onclick="location.href='details.html?movieId=${movie.id}'">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <div class="movie-info">
          <p class="rating">Rating: ${Math.round(movie.vote_average * 10)}%</p>
          <p class="release-date">${new Date(movie.release_date).toLocaleDateString()}</p>
        </div>
      </div>
    `;
    container.appendChild(movieCard);
  });
};

const loadCategoryMovies = async () => {
  const categoryMovies = await fetchCategoryMovies(category, currentPage);
  renderMovies(categoryMovies, categoryMoviesGrid);

  currentPage++;

  if (currentPage > totalPages) {
    loadMoreButton.style.display = 'none';
  }
};

loadMoreButton.addEventListener('click', loadCategoryMovies);

document.addEventListener('DOMContentLoaded', loadCategoryMovies);

const query = new URLSearchParams(window.location.search).get('query');

if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
}

const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('change', () => {
  if (darkModeToggle.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', 'enabled');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', 'disabled');
  }
});

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
