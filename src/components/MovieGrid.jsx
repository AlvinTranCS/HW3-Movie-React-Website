import MovieCard from './MovieCard';

export default function MovieGrid({ movies, loading, error }) {
    return (
        <main>
            <div id="movie-grid" className="movie-grid">
                {error ? (
                    <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>{error}</p>
                ) : movies.length === 0 && !loading ? (
                    <p style={{ gridColumn: '1 / -1', textAlign: 'center' }}>No movies found.</p>
                ) : (
                    movies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                )}
            </div>
        </main>
    );
}
