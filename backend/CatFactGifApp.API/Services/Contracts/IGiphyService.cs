namespace CatFactGifApp.API.Services.Contracts;
// IGiphyService.cs
public interface IGiphyService
{
    Task<string> GetGifUrl(string query);
}
