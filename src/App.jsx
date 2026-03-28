import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import MovieGrid from './components/MovieGrid';
import Pagination from './components/Pagination';
import './index.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export default function App() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [query, setQuery] = useState('');
    const [sortType, setSortType] = useState('none');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [inputValue, setInputValue] = useState('');

    const fetchMovies = useCallback(async (page, searchQuery) => {
        setLoading(true);
        setError(null);
        let url = '';

        if (searchQuery) {
            url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&page=${page}`;
        } else {
            url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            
            setMovies(data.results || []);
            // Only update total pages on the first page to prevent it from fluctuating during pagination
            if (page === 1) {
                setTotalPages(data.total_pages || 1);
            }
        } catch (err) {
            console.error('Error fetching movies:', err);
            setError('Failed to load movies. Please check your console.');
            setMovies([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMovies(currentPage, query);
    }, [currentPage, query, fetchMovies]);

    // Handle search debounce
    useEffect(() => {
        const handler = setTimeout(() => {
            if (query !== inputValue.trim()) {
                setQuery(inputValue.trim());
                setCurrentPage(1);
            }
        }, 400);

        return () => {
            clearTimeout(handler);
        };
    }, [inputValue, query]);

    const handleSearchChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    };

    const handlePrev = () => {
        const maxAllowedPage = totalPages > 500 ? 500 : totalPages;
        setCurrentPage((prev) => {
            if (prev <= 1) return maxAllowedPage;
            return prev - 1;
        });
    };

    const handleNext = () => {
        const maxAllowedPage = totalPages > 500 ? 500 : totalPages;
        setCurrentPage((prev) => {
            if (prev >= maxAllowedPage) return 1;
            return prev + 1;
        });
    };

    const sortMoviesClientSide = (moviesList, type) => {
        return [...moviesList].sort((a, b) => {
            if (type === 'primary_release_date.asc') {
                return new Date(a.release_date || '1900-01-01') - new Date(b.release_date || '1900-01-01');
            } else if (type === 'primary_release_date.desc') {
                return new Date(b.release_date || '1900-01-01') - new Date(a.release_date || '1900-01-01');
            } else if (type === 'vote_average.asc') {
                return (a.vote_average || 0) - (b.vote_average || 0);
            } else if (type === 'vote_average.desc') {
                return (b.vote_average || 0) - (a.vote_average || 0);
            }
            return 0;
        });
    };

    const moviesToRender = sortType !== 'none' ? sortMoviesClientSide(movies, sortType) : movies;

    return (
        <>
            <Header />
            <Controls 
                onSearchChange={handleSearchChange} 
                onSortChange={handleSortChange}
                sortValue={sortType}
            />
            <MovieGrid movies={moviesToRender} loading={loading} error={error} />
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={handlePrev}
                onNext={handleNext}
                loading={loading}
            />
        </>
    );
}
