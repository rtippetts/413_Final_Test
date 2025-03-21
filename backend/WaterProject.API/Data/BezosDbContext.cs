using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BezosBase.API.Data
{
    public class BezosDbContext : DbContext
    {
        public BezosDbContext(DbContextOptions<BezosDbContext> options) : base(options) 
        { 
        }

        public DbSet<Book> Books { get; set; }

    }
}
