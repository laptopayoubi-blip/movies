const API_KEY = "ee704f0062997632c6f55303847f68c2";

const movieId = localStorage.getItem("selectedMovieId");

const container = document.getElementById("container");

fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(movie => {

        container.innerHTML = `
            <h1>${movie.title}</h1>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
            <p>${movie.overview}</p>
            <p>⭐ Rating: ${movie.vote_average}</p>
        `;
    });