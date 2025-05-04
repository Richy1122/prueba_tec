namespace CatFactGifApp.API.Services.Contracts;
// ICatFactService.cs
public interface ICatFactService
{
    Task<string> GetRandomCatFact();
}
