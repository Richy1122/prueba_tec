using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CatFactGifApp.API.Services.Contracts;
using CatFactGifApp.API.Models;

namespace CatFactGifApp.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CatFactController : ControllerBase
    {
        private readonly ICatFactService _catFactService;
        private readonly IGiphyService _giphyService;
        private readonly IHistoryService _historyService;
         private static string _lastFact = "";
        private static string _lastQuery = "";
        private static string _lastGifUrl = "";
        
        public CatFactController(
            ICatFactService catFactService,
            IGiphyService giphyService,
            IHistoryService historyService)
        {
            _catFactService = catFactService;
            _giphyService = giphyService;
            _historyService = historyService;
        }

        [HttpGet("fact")]
        public async Task<IActionResult> GetRandomFact()
        {
            var fact = await _catFactService.GetRandomCatFact();
            _lastFact = fact;
            return Ok(new { fact });
        }

[HttpGet("save")]
public async Task<IActionResult> SaveLastCombinedData()
{
    try
    {
        // Verifica si hay datos previos para guardar
        if (string.IsNullOrEmpty(_lastFact) || string.IsNullOrEmpty(_lastGifUrl))
        {
            return BadRequest(new { error = "No hay datos recientes para guardar" });
        }

        // Guarda los últimos datos en el historial
        await _historyService.SaveSearch(_lastFact, _lastQuery, _lastGifUrl);
        
        return Ok(new { 
            message = "Datos guardados exitosamente",
            fact = _lastFact,
            gifUrl = _lastGifUrl 
        });
    }
    catch (Exception ex)
    {
        return BadRequest(new { error = ex.Message });
    }
}


        [HttpGet("gif")]
        public async Task<IActionResult> GetGif([FromQuery] string query)
        {
            try
            {
                var gifUrl = await _giphyService.GetGifUrl(query);
                _lastQuery = query;
                _lastGifUrl = gifUrl;
                
                return Ok(new { url = gifUrl }); // Devuelve un objeto con la URL
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });
            }
        }

        [HttpGet("history")]
        public async Task<IActionResult> GetAllFromDatabase()
        {
            var registros = await _historyService.GetAllRecords();

            return Ok(registros);
        }

        
    }
}