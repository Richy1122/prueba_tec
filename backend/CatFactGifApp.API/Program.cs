using System.Net.Http.Headers;
using CatFactGifApp.API.Data;
using CatFactGifApp.API.Services.Contracts;
using CatFactGifApp.API.Services.Implementations;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configuración de la base de datos con logging y SensitiveDataLogging habilitado
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
           .EnableSensitiveDataLogging()  // SOLO para desarrollo
           .LogTo(Console.WriteLine));    // Muestra los logs en consola

// Cliente para CatFact API
builder.Services.AddHttpClient<ICatFactService, CatFactService>(client =>
{
    client.BaseAddress = new Uri("https://catfact.ninja/");  // Dirección de la API de CatFact
    client.DefaultRequestHeaders.Accept.Clear();
    client.DefaultRequestHeaders.Accept.Add(
        new MediaTypeWithQualityHeaderValue("application/json"));
});

// Cliente para Giphy API
builder.Services.AddHttpClient("Giphy", client =>
{
    client.BaseAddress = new Uri("https://api.giphy.com/v1/gifs/"); // Dirección de la API de Giphy
    client.DefaultRequestHeaders.Accept.Clear();
    client.DefaultRequestHeaders.Accept.Add(
        new MediaTypeWithQualityHeaderValue("application/json"));
});

// Registro de servicios
builder.Services.AddTransient<IGiphyService, GiphyService>();
builder.Services.AddTransient<IHistoryService, HistoryService>();

// Configuración de CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:3000") // Ajusta al puerto de tu React
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

var app = builder.Build();

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors("AllowFrontend");  // Usa la política correcta de CORS
app.MapControllers();

app.Run();
