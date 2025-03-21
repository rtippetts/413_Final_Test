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
        public IActionResult GetBooks(int pageHowMany = 10, int pageNum = 1)
        {


            var something = _bezosContext.Books
                .Skip((pageNum-1) * pageHowMany)  //Why is this here?
                .Take(pageHowMany)
                .ToList();

            var totalNumBooks = _bezosContext.Books.Count();

            var someObject = new
            {
                books = something,
                TotalNumBooks = totalNumBooks
            };

            return Ok(someObject); //200 level status

        }

        //[HttpGet("FunctionalProjects")]
        //public IEnumerable<Project> GetFunctionalProjects()

        //{
        //    var something = _bezosContext.Books.Where(p => p.ProjectFunctionalityStatus == "Functional").ToList();
        //    return something;
        //}


 
    }
}
