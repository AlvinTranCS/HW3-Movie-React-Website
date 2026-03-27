export default function Pagination({ currentPage, totalPages, onPrev, onNext, loading }) {
    return (
        <footer>
            <button id="prev-btn" onClick={onPrev} disabled={loading}>Previous</button>
            <span id="page-info">{`Page ${currentPage} of ${Math.max(1, totalPages)}`}</span>
            <button id="next-btn" onClick={onNext} disabled={loading}>Next</button>
        </footer>
    );
}
