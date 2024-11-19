const API_KEY = '3821cee171333fe0fee20ff09687cfe3';
const BASE_URL = 'https://api.themoviedb.org/3';

const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('movie');

const movieTitle = document.getElementById('movie-title');
const movieGenres = document.getElementById('movie-genres');
const movieOverview = document.getElementById('movie-overview');
const movieCast = document.getElementById('movie-cast');
const recommendationsGrid = document.getElementById('recommendations-grid');
const backdropContainer = document.getElementById('backdrop-container');
const backButton = document.getElementById('back-button');

const fetchMovieDetails = async (movieId) => {
  const detailsResponse = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  const detailsData = await detailsResponse.json();

  const castResponse = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
  const castData = await castResponse.json();

  const genreRecommendations = await fetchGenreRecommendations(detailsData.genres);

  displayMovieDetails(detailsData, castData.cast, genreRecommendations);
};

const fetchGenreRecommendations = async (genres) => {
  if (genres.length === 0) return [];
  const genreId = genres[0].id; // Use the first genre for recommendations
  const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
  const data = await response.json();
  return data.results;
};

const displayMovieDetails = (details, cast, recommendations) => {
  movieTitle.innerText = details.title;
  movieGenres.innerText = details.genres.map(genre => genre.name).join(', ');
  movieOverview.innerText = details.overview;

  backdropContainer.style.backgroundImage = `url('https://image.tmdb.org/t/p/w1280${details.backdrop_path}')`;

  movieCast.innerHTML = '';
  cast.slice(0, 10).forEach(member => {
    const listItem = document.createElement('li');
    listItem.innerText = member.name;
    movieCast.appendChild(listItem);
  });

  recommendationsGrid.innerHTML = '';
  recommendations.forEach(movie => {
    const recommendationCard = document.createElement('div');
    recommendationCard.className = 'movie-card';
    recommendationCard.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
      <h3>${movie.title}</h3>
    `;
    recommendationCard.addEventListener('click', () => {
      window.location.href = `details.html?movie=${movie.id}`;
    });
    recommendationsGrid.appendChild(recommendationCard);
  });
};

backButton.addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Fetch and display movie details on page load
fetchMovieDetails(movieId);
