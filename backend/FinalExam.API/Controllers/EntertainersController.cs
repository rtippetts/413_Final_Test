using System.Security.Cryptography.X509Certificates;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using FinalExam.API.Data;
using System.Globalization;

namespace FinalExam.API.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class EntertainersController : ControllerBase
    {
        private FinalExamDbContext _finalExamContext;

        // Inject the database context via constructor
        public EntertainersController(FinalExamDbContext temp) => _finalExamContext = temp;

        // GET: /Entertainers/AllEntertainers
        // Returns a list of all entertainers with booking count and most recent booking date
        [HttpGet("AllEntertainers")]
        public IActionResult GetAllEntertainers()
        {
            var entertainers = _finalExamContext.Entertainers
                .Select(e => new
                {
                    e.EntertainerID,
                    e.EntStageName,
                    BookingCount = _finalExamContext.Engagements.Count(en => en.EntertainerID == e.EntertainerID),
                    LastBookingDate = _finalExamContext.Engagements
                                        .Where(en => en.EntertainerID == e.EntertainerID)
                                        .OrderByDescending(en => en.EndDate)
                                        .Select(en => en.EndDate)
                                        .FirstOrDefault()
                })
                .ToList();

            return Ok(entertainers);
        }

        // POST: /Entertainers/AddEntertainer
        // Adds a new entertainer to the database
        [HttpPost("AddEntertainer")]
        public IActionResult AddEntertainer([FromBody] Entertainer newEntertainer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Ensures required fields are validated
            }

            _finalExamContext.Entertainers.Add(newEntertainer);
            _finalExamContext.SaveChanges();

            return Ok(newEntertainer); // Returns the newly added entertainer
        }

        // PUT: /Entertainers/UpdateEntertainer/{id}
        // Updates the fields for an existing entertainer
        [HttpPut("UpdateEntertainer/{id}")]
        public IActionResult UpdateEntertainer(int id, [FromBody] Entertainer updatedEntertainer)
        {
            var existingEntertainer = _finalExamContext.Entertainers.Find(id);

            if (existingEntertainer == null)
            {
                return NotFound($"Entertainer with ID {id} not found.");
            }

            // Update all properties manually
            existingEntertainer.EntStageName = updatedEntertainer.EntStageName;
            existingEntertainer.EntSSN = updatedEntertainer.EntSSN;
            existingEntertainer.EntStreetAddress = updatedEntertainer.EntStreetAddress;
            existingEntertainer.EntCity = updatedEntertainer.EntCity;
            existingEntertainer.EntState = updatedEntertainer.EntState;
            existingEntertainer.EntZipCode = updatedEntertainer.EntZipCode;
            existingEntertainer.EntPhoneNumber = updatedEntertainer.EntPhoneNumber;
            existingEntertainer.EntWebPage = updatedEntertainer.EntWebPage;
            existingEntertainer.EntEmailAddress = updatedEntertainer.EntEmailAddress;
            existingEntertainer.DateEntered = updatedEntertainer.DateEntered;

            _finalExamContext.Entertainers.Update(existingEntertainer);
            _finalExamContext.SaveChanges();

            return Ok(existingEntertainer);
        }

        // GET: /Entertainers/{id}
        // Retrieves a single entertainer by ID
        [HttpGet("{id}")]
        public IActionResult GetEntertainerById(int id)
        {
            var entertainer = _finalExamContext.Entertainers.Find(id);

            if (entertainer == null)
            {
                return NotFound(new { message = $"Entertainer with ID {id} not found." });
            }

            return Ok(entertainer);
        }

        // DELETE: /Entertainers/{id}
        // Deletes an entertainer from the database
        [HttpDelete("{id}")]
        public IActionResult DeleteEntertainer(int id)
        {
            var entertainer = _finalExamContext.Entertainers.Find(id);

            if (entertainer == null)
            {
                return NotFound(new { message = "Entertainer not found" });
            }

            _finalExamContext.Entertainers.Remove(entertainer);
            _finalExamContext.SaveChanges();

            return NoContent(); // Return 204 No Content if deletion is successful
        }
    }
}
