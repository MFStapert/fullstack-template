using App.Models;
using Microsoft.EntityFrameworkCore;

namespace App.Data
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options) { }
        public DbSet<Test> Test { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Test>().HasData(
                new Test
                {
                    Id = 1,
                    Text = "hello cms"
                },
                new Test
                {
                    Id = 2,
                    Text = "hello site"
                }
            );
        }
    }
}