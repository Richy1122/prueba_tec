using CatFactGifApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CatFactGifApp.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<SearchHistory> SearchHistories { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Configuraciones adicionales si las necesitas
        modelBuilder.Entity<SearchHistory>(entity =>
        {
            entity.HasKey(e => e.Id);
        });
    }
}