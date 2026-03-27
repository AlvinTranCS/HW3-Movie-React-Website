const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export default function MovieCard({ movie }) {
    const { title, poster_path, release_date, vote_average } = movie;
    
    const posterUrl = poster_path 
        ? `${IMAGE_BASE_URL}${poster_path}` 
        : 'https://via.placeholder.com/500x750?text=No+Poster';
    
    const formattedRating = vote_average ? Math.round(vote_average * 10) / 10 : 'N/A';

    return (
        <div className="movie-card">
            <img src={posterUrl} alt={`${title} poster`} />
            <div className="movie-info">
                <h3>{title}</h3>
                <p>Release Date: {release_date || 'N/A'}</p>
                <p>Rating: {formattedRating}</p>
            </div>
        </div>
    );
}
