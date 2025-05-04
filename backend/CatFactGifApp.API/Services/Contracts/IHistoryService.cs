using CatFactGifApp.API.Models;
namespace CatFactGifApp.API.Services.Contracts;
// IHistoryService.cs
public interface IHistoryService
{
    Task SaveSearch(string fact, string query, string gifUrl);
    Task<List<SearchHistory>> GetSearchHistory();
     Task<List<SearchHistory>> GetAllRecords();     // Nuevo método
    
}