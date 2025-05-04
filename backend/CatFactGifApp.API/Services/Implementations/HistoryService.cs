namespace CatFactGifApp.API.Services.Implementations;
using CatFactGifApp.API.Models;
using CatFactGifApp.API.Data;
using CatFactGifApp.API.Services.Contracts;  
using Microsoft.EntityFrameworkCore;

public class HistoryService : IHistoryService
{
    private readonly AppDbContext _context;

    public HistoryService(AppDbContext context)
    {
        _context = context;
    }

    public async Task SaveSearch(string fact, string query, string gifUrl)
    {
        try
        {            
            if (string.IsNullOrEmpty(fact) || string.IsNullOrEmpty(query) || string.IsNullOrEmpty(gifUrl))
            {
                Console.WriteLine("Error: Los valores de fact, query o gifUrl son nulos o vacíos.");
                return;
            }
            
            var history = new SearchHistory
            {
                Fact = fact,
                Query = query,
                GifUrl = gifUrl,
                SearchDate = DateTime.UtcNow  // Asegúrate de incluir la fecha
            };

            _context.SearchHistories.Add(history);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error al guardar búsqueda: {ex.Message}");
        }
    }

    public async Task<List<SearchHistory>> GetSearchHistory()
    {
        return await _context.SearchHistories
            .OrderByDescending(h => h.SearchDate)
            .AsNoTracking()
            .ToListAsync();
    }

    public async Task<List<SearchHistory>> GetAllRecords()
    {
        return await _context.SearchHistories
            .AsNoTracking()
            .ToListAsync();
    }
}