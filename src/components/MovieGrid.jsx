import MovieCard from './MovieCard';

export default function MovieGrid({ movies, loading, error }) {
    return (
        <main>
            <div id="movie-grid" className="movie-grid">
                {error ? (
                    <p className="grid-message">{error}</p>
                ) : movies.length === 0 && !loading ? (
                    <p className="grid-message">No movies found.</p>
                ) : (
                    movies.map((movie, index) => (
                        <MovieCard key={`${movie.id}-${index}`} movie={movie} />
                    ))
                )}
            </div>
        </main>
    );
}
