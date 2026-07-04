const API_KEY = "ee704f0062997632c6f55303847f68c2";

const movieId = localStorage.getItem("movieId");

let currentTrailer = null;

if (!movieId) {

    document.getElementById("movie").innerHTML =
        "<h2>No movie selected.</h2>";

} else {

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&append_to_response=videos`)
        .then(res => res.json())
        .then(movie => {

            if (movie.videos && movie.videos.results) {

                const trailer = movie.videos.results.find(video =>
                    video.type === "Trailer" &&
                    video.site === "YouTube"
                );

                if (trailer) {
                    currentTrailer = trailer.key;
                }
            }

            document.getElementById("movie").innerHTML = `
                <div
                    class="banner"
                    style="
                        background-image:
                        linear-gradient(
                            to top,
                            #111 5%,
                            rgba(17,17,17,.5) 40%,
                            rgba(17,17,17,.2) 100%
                        ),
                        url('https://image.tmdb.org/t/p/original${movie.backdrop_path}');
                    "
                >

                    <div class="banner-content">

                        <img
                            class="poster"
                            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                            alt="${movie.title}"
                        >

                        <div class="info">

                            <h1>${movie.title}</h1>

                            <div class="stats">
                                <span>⭐ ${movie.vote_average}</span>
                                <span>📅 ${movie.release_date}</span>
                            </div>

                            <div class="actions">

                                <button
                                    id="favoriteBtn"
                                    class="favorite-btn"
                                    onclick="toggleFavorite(${movie.id})"
                                >
                                    ❤️ Add to Favorites
                                </button>

                                <button
                                    class="trailer-btn"
                                    onclick="watchTrailer()"
                                >
                                    ▶ Watch Trailer
                                </button>

                            </div>

                            <p class="overview">
                                ${movie.overview}
                            </p>

                        </div>

                    </div>

                </div>
            `;

            updateFavoriteButton(movie.id);

        })
        .catch(error => {

            console.error(error);

            document.getElementById("movie").innerHTML =
                "<h2>Failed to load movie.</h2>";

        });

}

function watchTrailer() {

    if (currentTrailer) {

        window.open(
            `https://www.youtube.com/watch?v=${currentTrailer}`,
            "_blank"
        );

    } else {

        alert("Trailer not available.");

    }

}

function toggleFavorite(movieId) {

    let favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    const btn =
        document.getElementById("favoriteBtn");

    if (favorites.includes(movieId)) {

        favorites =
            favorites.filter(id => id !== movieId);

        if (btn) {
            btn.textContent =
                "❤️ Add to Favorites";
        }

        alert("Removed from Favorites");

    } else {

        favorites.push(movieId);

        if (btn) {
            btn.textContent =
                "💔 Remove from Favorites";
        }

        alert("Added to Favorites");

    }

    localStorage.setItem(
        "favorites",
        JSON.stringify(favorites)
    );
}

function updateFavoriteButton(movieId) {

    const favorites =
        JSON.parse(localStorage.getItem("favorites")) || [];

    const btn =
        document.getElementById("favoriteBtn");

    if (!btn) return;

    if (favorites.includes(movieId)) {

        btn.textContent =
            "💔 Remove from Favorites";

    } else {

        btn.textContent =
            "❤️ Add to Favorites";

    }

}