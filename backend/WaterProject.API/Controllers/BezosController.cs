using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BezosBase.API.Data;
using System.Globalization;

namespace BezosBase.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BezosController : ControllerBase
    {

        private BezosDbContext _bezosContext;
        public BezosController(BezosDbContext temp) => _bezosContext = temp;

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageHowMany = 10, int pageNum = 1, [FromQuery] List<string>? bookTypes=null)
        {
            var query = _bezosContext.Books.AsQueryable();

            if (bookTypes != null && bookTypes.Any())
            {
                query = query.Where(b => bookTypes.Contains(b.Category));

            }

            var totalNumBooks = query.Count();

            var something = query
                .Skip((pageNum-1) * pageHowMany)  //Why is this here?
                .Take(pageHowMany)
                .ToList();

            



            var someObject = new
            {
                books = something,
                TotalNumBooks = totalNumBooks
            };

            return Ok(someObject); //200 level status

        }

        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories ()
        {
            var bookCategories = _bezosContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookCategories);
        }

        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
                {
                    _bezosContext.Books.Add(newBook);
                    _bezosContext.SaveChanges();
                    return Ok(newBook);
                }

        [HttpPut("UpdateBook/{bookID}")]
        public IActionResult UpdateBook(int BookID, [FromBody] Book updatedBook)
                {
                    var existingBook = _bezosContext.Books.Find(BookID);

                    existingBook.Title = updatedBook.Title;
                    existingBook.Author = updatedBook.Author;
                    existingBook.Publisher = updatedBook.Publisher;
                    existingBook.ISBN = updatedBook.ISBN;
                    existingBook.Classification = updatedBook.Classification;
                    existingBook.Category = updatedBook.Category;
                    existingBook.PageCount = updatedBook.PageCount;
                    existingBook.Price = updatedBook.Price;

                    _bezosContext.Books.Update(existingBook);
                    _bezosContext.SaveChanges();

                    return Ok(existingBook);
                }



        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook(int bookID)
            {
                var book = _bezosContext.Books.Find(bookID);
                
                if (book == null)
                {
                    return NotFound(new { message = "Book not found" });
                }
                
                _bezosContext.Books.Remove(book);
                _bezosContext.SaveChanges();
                
                return NoContent();
            }



    }
}
