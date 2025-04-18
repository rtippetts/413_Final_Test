using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalExam.API.Data
{
    // This class serves as the bridge between your C# models and the SQLite database
    public class FinalExamDbContext : DbContext
    {
        // Constructor accepts configuration options and passes them to the base DbContext
        public FinalExamDbContext(DbContextOptions<FinalExamDbContext> options) : base(options) 
        { 
        }

        // DbSet representing the Entertainers table in the database
        public DbSet<Entertainer> Entertainers { get; set; }

        // DbSet representing the Engagements table in the database
        public DbSet<Engagement> Engagements { get; set; }
    }
}
