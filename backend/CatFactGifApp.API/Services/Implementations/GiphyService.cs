using Microsoft.Extensions.Configuration;
using System.Net.Http;
using System.Net.Http.Json;
using CatFactGifApp.API.Services.Contracts;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Mvc;

namespace CatFactGifApp.API.Services.Implementations
{
    public class GiphyService : IGiphyService
    {
        private readonly HttpClient _httpClient;
        private readonly IConfiguration _config;

        public GiphyService(IHttpClientFactory httpClientFactory, IConfiguration config)
        {
            _httpClient = httpClientFactory.CreateClient("Giphy");
            _config = config;
        }

        public async Task<string> GetGifUrl(string query)
        {
            var apiKey = _config["Giphy:ApiKey"];
            var baseUrl = _config["Giphy:BaseUrl"];
            var url = $"{baseUrl}/search?api_key={apiKey}&q={query}&limit=1";

            try
            {
                var response = await _httpClient.GetFromJsonAsync<GiphyResponse>(url);
                
                if (response?.Data?.Count > 0)
                {
                    return response.Data[0].Images.Original.Url 
                           ?? throw new Exception("GIF URL is null");
                }
                
                throw new Exception("No GIFs found for the given query");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching GIF: {ex.Message}");
                throw; // Re-throw to handle in controller
            }
        }

        // Corrected Giphy response structure
        public class GiphyResponse
        {
            public List<GifData> Data { get; set; } = new List<GifData>();
            public Pagination Pagination { get; set; } = new Pagination();
            public Meta Meta { get; set; } = new Meta();
        }

        public class GifData
        {
            public string Type { get; set; } = string.Empty;
            public string Id { get; set; } = string.Empty;
            public string Url { get; set; } = string.Empty;
            public GifImages Images { get; set; } = new GifImages();
        }

        public class GifImages
        {
            public ImageInfo Original { get; set; } = new ImageInfo();
        }

        public class ImageInfo
        {
            public string Url { get; set; } = string.Empty;
            public string Width { get; set; } = string.Empty;
            public string Height { get; set; } = string.Empty;
            public string Size { get; set; } = string.Empty;
        }

        public class Pagination
        {
            public int TotalCount { get; set; }
            public int Count { get; set; }
            public int Offset { get; set; }
        }

        public class Meta
        {
            public int Status { get; set; }
            public string Msg { get; set; } = string.Empty;
            public string ResponseId { get; set; } = string.Empty;
        }
    }
}
