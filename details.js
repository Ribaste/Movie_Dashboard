const API_KEY = '3821cee171333fe0fee20ff09687cfe3';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fetchMovieDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = urlParams.get('movieId');

  try {
    const movieResponse = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
    const movie = await movieResponse.json();

    const castResponse = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);
    const castData = await castResponse.json();

    const recommendationsResponse = await fetch(`${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}`);
    const recommendationsData = await recommendationsResponse.json();

    const movieDetailsSection = document.getElementById('movie-details');
    movieDetailsSection.innerHTML = `
      <div class="movie-backdrop" style="background-image: url('https://image.tmdb.org/t/p/original/${movie.backdrop_path}');"></div>
        <div class="movie-details-container">
            <h1>${movie.title}</h1>
            <div class="movie-info">
                <p class="rating">Rating: ${movie.vote_average * 10}%</p>
                <p class="release-date">Release Date: ${movie.release_date}</p>
                <p class="description">${movie.overview}</p>
            </div>
        </div>
    `;

    const castContainer = document.querySelector('.cast-container');
    castContainer.innerHTML = castData.cast.slice(0, 100).map(actor => `
      <div class="cast-card">
        <img src="https://image.tmdb.org/t/p/w500${actor.profile_path}" onerror="this.onerror=null; this.src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg';" alt="${actor.name}">
        <p>${actor.name}</p>
      </div>
    `).join('');

    const recommendationsContainer = document.querySelector('.recommendations-container');
    recommendationsContainer.innerHTML = recommendationsData.results.slice(0, 100).map(movie => `
      <div class="movie-card">
        <div onclick="location.href='details.html?movieId=${movie.id}'">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
          <p>${movie.title}</p>
        </div>
      </div>
    `).join('');

  } catch (error) {
    console.error('Error fetching movie details:', error);
  }
}

fetchMovieDetails();

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
