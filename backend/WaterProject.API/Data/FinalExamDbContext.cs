using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalExam.API.Data
{
    public class FinalExamDbContext : DbContext
    {
        public FinalExamDbContext(DbContextOptions<FinalExamDbContext> options) : base(options) 
        { 
        }

        public DbSet<Entertainer> Entertainers { get; set; }
        public DbSet<Engagement> Engagements { get; set; }


    }
}
