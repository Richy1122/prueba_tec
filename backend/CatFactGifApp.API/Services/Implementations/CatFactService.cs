namespace CatFactGifApp.API.Services.Implementations;
using CatFactGifApp.API.Services.Contracts;
using CatFactGifApp.API.Data;  
using CatFactGifApp.API.Models; 

using System.Net.Http.Json;

// CatFactService.cs
public class CatFactService : ICatFactService
{
    private readonly HttpClient _httpClient; // Declaración correcta

    // Recibe HttpClient inyectado
    public CatFactService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }


    public async Task<string> GetRandomCatFact()
    {
        var response = await _httpClient.GetFromJsonAsync<CatFactResponse>("fact");
        return response?.Fact ?? "No se pudo obtener un dato sobre gatos";
    }

    private record CatFactResponse(string Fact);
}