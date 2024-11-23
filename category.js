const API_KEY = '3821cee171333fe0fee20ff09687cfe3';
const BASE_URL = 'https://api.themoviedb.org/3';

const categoryMoviesGrid = document.getElementById('category-movies-grid');
const pagination = document.getElementById('pagination');
const themeToggleButton = document.getElementById('theme-toggle');

const category = new URLSearchParams(window.location.search).get('category');

// Fetch movies for category
const fetchCategoryMovies = async (category, page) => {
  let url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}&page=${page}`;
  
  if (category === 'animation') {
    url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=16&page=${page}`;
  }
  
  const response = await fetch(url);
  const data = await response.json();
  return data.results;
};

// Render movies in grid format
const renderMovies = (movies, container) => {
  container.innerHTML = movies
    .map(
      (movie) => `
      <div class="movie-card" onclick="location.href='details.html?movieId=${movie.id}'">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        <h3>${movie.title}</h3>
      </div>
    `
    )
    .join('');
};

// Create pagination
const createPagination = (totalPages, currentPage) => {
  pagination.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.innerText = i;
    pageButton.onclick = () => loadCategoryMovies(i);
    if (i === currentPage) {
      pageButton.disabled = true;
    }
    pagination.appendChild(pageButton);
  }
};

// Load and display category movies
const loadCategoryMovies = async (page = 1) => {
  const categoryMovies = await fetchCategoryMovies(category, page);
  renderMovies(categoryMovies, categoryMoviesGrid);

  // Assuming we're receiving `total_pages` from the API
  const totalPages = 10; // This should be dynamic based on actual response
  createPagination(totalPages, page);
};

// Theme toggle functionality
themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const mode = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', mode);
  themeToggleButton.textContent = mode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    themeToggleButton.textContent = 'Switch to Dark Mode';
  }
  loadCategoryMovies();
});
