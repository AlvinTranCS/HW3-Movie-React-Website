export default function Controls({ onSearchChange, onSortChange, sortValue }) {
    return (
        <div className="controls-container">
            <input 
                type="text" 
                id="search-bar" 
                placeholder="Search for a movie..." 
                onChange={onSearchChange}
            />
            <select id="sort-dropdown" value={sortValue} onChange={onSortChange}>
                <option value="none">Sort By</option>
                <option value="primary_release_date.asc">Release Date (Asc)</option>
                <option value="primary_release_date.desc">Release Date (Desc)</option>
                <option value="vote_average.asc">Rating (Asc)</option>
                <option value="vote_average.desc">Rating (Desc)</option>
            </select>
        </div>
    );
}
