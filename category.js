const API_KEY = '3821cee171333fe0fee20ff09687cfe3';
const BASE_URL = 'https://api.themoviedb.org/3';

const categoryMoviesGrid = document.getElementById('category-movies-grid');
const loadMoreButton = document.getElementById('load-more-button');
const categoryTitle = document.getElementById("category");
const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const darkModeToggle = document.getElementById('darkModeToggle');

let category = new URLSearchParams(window.location.search).get('category');
let query = new URLSearchParams(window.location.search).get('query');
let currentPage = 1;
let totalPages = 1;

categoryTitle.innerHTML = (category[0].toUpperCase() + category.substring(1)).replace(/_/g, " ");

if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
  darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode', darkModeToggle.checked);
  localStorage.setItem('darkMode', darkModeToggle.checked ? 'enabled' : 'disabled');
});

async function fetchCategoryMovies(category, page = 1) {
  try {
    let url;
    if (category === 'search' && query) {
      url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
    } else if (category === 'animation') {
      url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&page=${page}`;
    } else {
      url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}&page=${page}`;
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    totalPages = data.total_pages;
    return data.results || [];
  } catch (error) {
    console.error("Failed to fetch movies:", error);
    return [];
  }
}

const renderMovies = (movies, container) => {
  container.innerHTML += movies.map(movie => `
    <div class="movie-card" onclick="location.href='details.html?movieId=${movie.id}'">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <div class="movie-info">
        <p class="rating">Rating: ${Math.round(movie.vote_average * 10)}%</p>
        <p class="release-date">${new Date(movie.release_date).toLocaleDateString()}</p>
      </div>
    </div>
  `).join('');
};

const loadCategoryMovies = async () => {
  const movies = await fetchCategoryMovies(category, currentPage);
  renderMovies(movies, categoryMoviesGrid);
  currentPage++;

  if (currentPage > totalPages) {
    loadMoreButton.style.display = 'none';
  }
};

function handleSearch() {
  const query = searchInput.value.trim();
  if (query) {
    window.location.href = `category.html?category=search&query=${encodeURIComponent(query)}`;
  }
}

loadMoreButton.addEventListener('click', loadCategoryMovies);
document.addEventListener('DOMContentLoaded', loadCategoryMovies);
searchButton.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSearch();
});
