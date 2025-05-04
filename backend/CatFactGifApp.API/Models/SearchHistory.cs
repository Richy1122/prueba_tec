namespace CatFactGifApp.API.Models;
public class SearchHistory
{
    public int Id { get; set; }
    public DateTime SearchDate { get; set; } = DateTime.UtcNow;
    public required string Fact { get; set; }
    public required string Query { get; set; }
    public required string GifUrl { get; set; }
}