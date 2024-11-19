const API_KEY = '3821cee171333fe0fee20ff09687cfe3';
const BASE_URL = 'https://api.themoviedb.org/3';

const moviesGrid = document.getElementById('movies-grid');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const currentPageSpan = document.getElementById('current-page');

let currentPage = 1;
let totalPages = 1;
let searchQuery = '';

const fetchMovies = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  totalPages = data.total_pages; // Update total pages from the API response
  displayMovies(data.results);
  updatePaginationButtons();
};

const fetchPopularMovies = async (page = 1) => {
  const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;
  fetchMovies(url);
};

const searchMovies = async (query, page = 1) => {
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
  fetchMovies(url);
};

const displayMovies = async (movies) => {
  const genreMap = await fetchGenres();

  moviesGrid.innerHTML = '';
  movies.forEach(movie => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <p>${movie.genre_ids.map(id => genreMap[id]).join(', ')}</p>
    `;
    movieCard.addEventListener('click', () => {
      window.location.href = `details.html?movie=${movie.id}`;
    });
    moviesGrid.appendChild(movieCard);
  });
};

const fetchGenres = async () => {
  const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  const data = await response.json();
  return data.genres.reduce((map, genre) => {
    map[genre.id] = genre.name;
    return map;
  }, {});
};

const updatePaginationButtons = () => {
  prevPageButton.disabled = currentPage <= 1;
  nextPageButton.disabled = currentPage >= totalPages;
  currentPageSpan.textContent = `Page ${currentPage}`;
};

prevPageButton.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    if (searchQuery) {
      searchMovies(searchQuery, currentPage);
    } else {
      fetchPopularMovies(currentPage);
    }
  }
});

nextPageButton.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    if (searchQuery) {
      searchMovies(searchQuery, currentPage);
    } else {
      fetchPopularMovies(currentPage);
    }
  }
});

searchButton.addEventListener('click', () => {
  searchQuery = searchInput.value;
  currentPage = 1; // Reset to first page on new search
  if (searchQuery) {
    searchMovies(searchQuery, currentPage);
  }
});

// Initial fetch
fetchPopularMovies(currentPage);
