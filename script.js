const API_KEY = "ee704f0062997632c6f55303847f68c2";

let allMovies = [];

function loadMovies() {

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
        .then(res => res.json())
        .then(data => {

            allMovies = data.results;

            displayMovies(allMovies);

        })
        .catch(error => {

            console.error(error);
            alert("Failed to load movies.");

        });
}

function displayMovies(movies) {

    const moviesDiv = document.getElementById("movies");

    moviesDiv.innerHTML = "";

    movies.forEach(movie => {

        const movieCard = document.createElement("div");

        movieCard.className = "movie";

        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>⭐ ${movie.vote_average}</p>
                <p>📅 ${movie.release_date}</p>
            </div>
        `;

        movieCard.addEventListener("click", () => {

            movieCard.classList.add("clicked");

            const page = document.getElementById("page");

            setTimeout(() => {

                page.classList.add("hide");

                localStorage.setItem("movieId", movie.id);

                setTimeout(() => {

                    window.location.href = "movie.html";

                }, 400);

            }, 200);

        });

        moviesDiv.appendChild(movieCard);

    });
}

document.getElementById("search").addEventListener("input", function () {

    const searchText = this.value.toLowerCase();

    const filteredMovies = allMovies.filter(movie =>
        movie.title.toLowerCase().includes(searchText)
    );

    displayMovies(filteredMovies);

});

window.addEventListener("load", () => {
    loadMovies();
});