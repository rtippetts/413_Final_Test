import { useEffect, useState } from 'react';
import { Book } from './types/Book';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from './api/BooksAPI';
import Pagination from './components/Pagination';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Sorting states
    const [ascending, setAscending] = useState<boolean>(true);
    const [enableSorting, setEnableSorting] = useState<boolean>(true);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, selectedCategories);
            

            
            setBooks(data.books);
            setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        
        };
        
        loadBooks();
    }, [pageSize, pageNum, selectedCategories]);

    if (loading) return <p>Loading projects...</p>
    if (error) return <p className="text-red-500">Error: {error}</p>

    // Apply sorting only if sorting is enabled
    const sortedBooks = enableSorting 
        ? [...books].sort((a, b) => ascending ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title))
        : books;

    return (
        <>
            {sortedBooks.map((b) => {
                const colors = ["bg-primary", "bg-success", "bg-warning", "bg-info", "bg-secondary"];
                const randomColor = colors[Math.floor(Math.random() * colors.length)]; // Random color per book

                return (
                    <div id="projectCard" className={`card ${randomColor} rounded-pill`} key={b.bookID}>

                        <h3 className="card-title">{b.title}</h3>
                        <div className="card-body">
                            <ul className="list-unstyled">
                                <li><strong>Author:</strong> {b.author}</li>
                                <li><strong>Publisher:</strong> {b.publisher}</li>
                                <li><strong>ISBN:</strong> {b.isbn}</li>
                                <li><strong>Classification/Category:</strong> {b.classification}/{b.category}</li>
                                <li><strong>Number of Pages:</strong> {b.pageCount}</li>
                                <li><strong>Price:</strong> {b.price}</li>

                                <button className="btn btn-success" onClick={() => navigate(`/purchase/${b.title}/${b.price}/${b.bookID}`)} >Purchase</button>
                            </ul>    
                        </div>
                    </div>
                );
            })}

            {/* Call Pagination Tag */}
            <div>
                <Pagination 
                  currentPage={pageNum}
                  totalPages={totalPages}
                  pageSize={pageSize}
                  onPageChange={setPageNum}
                  onPageSizeChange={(newSize) => {
                     setPageSize(newSize);
                     setPageNum(1);
                  }}
                  
                
                /> 
            </div>

            {/* Sorting Controls */}
            <br />
            <label>
                Sorting:
                <button onClick={() => setEnableSorting(!enableSorting)}>
                    {enableSorting ? 'Disable Sorting' : 'Enable Sorting'}
                </button>
            </label>
            {enableSorting && (
                <button onClick={() => setAscending(!ascending)}>
                    {ascending ? 'Ascending' : 'Descending'}
                </button>
            )}
        </>
    );
}

export default BookList;
