namespace CatFactGifApp.API.Models
{
    public class GiphyResponse
    {
        public List<GifData> Data { get; set; } = new();
    }

    public class GifData
    {
        public GifImages Images { get; set; } = new();
    }

    public class GifImages
    {
        public ImageInfo Original { get; set; } = new();
    }

    public class ImageInfo
    {
        public string Url { get; set; } = string.Empty;
    }
}