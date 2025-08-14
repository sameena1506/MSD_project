// script.js
document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);

  // --- FILTERS (Genre / Language) ---
  document.querySelectorAll('.dropdown .dropbtn').forEach(btn => {
    const dropdownContent = btn.nextElementSibling;
    const label = (btn.textContent || '').trim().toLowerCase();
    if (!dropdownContent) return;

    if (label === 'genre') {
      dropdownContent.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          const selectedGenre = (link.textContent || '').trim().toLowerCase();
          document.querySelectorAll('.movie-card').forEach(card => {
            const genres = (card.dataset.genre || '').toLowerCase();
            card.style.display = genres.includes(selectedGenre) ? '' : 'none';
          });
        });
      });
      btn.addEventListener('click', () => {
        document.querySelectorAll('.movie-card').forEach(card => card.style.display = '');
      });
    }

    if (label === 'languages' || label === 'language') {
      dropdownContent.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', e => {
          e.preventDefault();
          const selectedLanguage = (link.textContent || '').trim().toLowerCase();
          document.querySelectorAll('.movie-card').forEach(card => {
            const language = (card.dataset.language || '').toLowerCase();
            card.style.display = (language === selectedLanguage) ? '' : 'none';
          });
        });
      });
      btn.addEventListener('click', () => {
        document.querySelectorAll('.movie-card').forEach(card => card.style.display = '');
      });
    }
  });

  // --- SEARCH FILTER ---
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.querySelector('.search-input');
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', e => {
      e.preventDefault();
      const q = searchInput.value.trim().toLowerCase();
      document.querySelectorAll('.movie-card').forEach(card => {
        const title = (card.dataset.title || '').toLowerCase();
        card.style.display = title.includes(q) ? '' : 'none';
      });
    });

    searchInput.addEventListener('input', function () {
      if (this.value.trim() === '') {
        document.querySelectorAll('.movie-card').forEach(card => card.style.display = '');
      }
    });
  }

  // --- REDIRECT TO DETAILS PAGE (index -> movies.html) ---
  document.querySelectorAll('.movie-card').forEach(card => {
    card.addEventListener('click', function () {
      const img = card.querySelector('img');
      const paramsObj = {
        title: card.dataset.title || '',
        cast: card.dataset.cast || '',
        genre: card.dataset.genre || '',
        synopsis: card.dataset.synopsis || '',
        image: img ? img.getAttribute('src') : '',
        directedby: card.dataset.directedby || '',
        writtenby: card.dataset.writtenby || '',
        producedby: card.dataset.producedby || '',
        musicby: card.dataset.musicby || '',
        runningtime: card.dataset.runningtime || '',
        country: card.dataset.country || '',
        language: card.dataset.language || ''
      };
      const queryString = new URLSearchParams(paramsObj).toString();
      window.location.href = `movies.html?${queryString}`;
    });
  });

  // --- POPULATE MOVIE DETAILS ON movies.html ---
  const detailFields = {
    movieTitle: 'title',
    movieCast: 'cast',
    movieGenre: 'genre',
    movieSynopsis: 'synopsis',
    movieDirectedBy: 'directedby',
    movieWrittenBy: 'writtenby',
    movieProducedBy: 'producedby',
    movieMusicBy: 'musicby',
    movieRunningTime: 'runningtime',
    movieCountry: 'country',
    movieLanguage: 'language'
  };

  // Only run details-population if details page elements exist
  if (document.getElementById('movieTitle')) {
    Object.entries(detailFields).forEach(([id, key]) => {
      const el = document.getElementById(id);
      if (el) el.textContent = params.get(key) || '';
    });

    const movieImage = document.getElementById('movieImage');
    if (movieImage) {
      movieImage.src = params.get('image') || '';
      movieImage.alt = (params.get('title') || '') + ' Poster';
    }
  }
});
