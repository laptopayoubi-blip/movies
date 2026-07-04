const API_KEY = "YOUR_TMDB_API_KEY";

const favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

const container =
    document.getElementById("favorites");

if (favorites.length === 0) {

    container.innerHTML =
        '<div class="empty">No favorite movies yet ❤️</div>';

} else {

    favorites.forEach(movieId => {

        fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`
        )
        .then(res => res.json())
        .then(movie => {

            container.innerHTML += `
                <div
                    class="movie"
                    onclick="openMovie(${movie.id})"
                >

                    <img
                        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                    >

                    <div class="movie-info">

                        <h3>${movie.title}</h3>

                        <p>⭐ ${movie.vote_average}</p>

                    </div>

                </div>
            `;

        });

    });

}

function openMovie(id){

    localStorage.setItem(
        "movieId",
        id
    );

    window.location.href =
        "movie.html";

}