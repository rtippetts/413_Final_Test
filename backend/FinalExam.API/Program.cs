using Microsoft.EntityFrameworkCore;
using FinalExam.API.Data;

var builder = WebApplication.CreateBuilder(args);

// 🔧 Add services to the container (dependency injection)

// Enables controller support (e.g. API endpoints)
builder.Services.AddControllers();

// Adds support for API documentation via Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registers the SQLite database context with the connection string defined in appsettings.json
builder.Services.AddDbContext<FinalExamDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("EntertainerConnection")));

// 🛡️ Enables CORS to allow requests from any origin — useful for local frontend testing
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy
                .AllowAnyOrigin()   // Allows any domain to call the API
                .AllowAnyHeader()   // Accepts any headers (e.g., Content-Type, Authorization)
                .AllowAnyMethod();  // Accepts GET, POST, PUT, DELETE, etc.
        });
});

// 🔄 Alternate CORS config for targeting only the frontend (left here for reference)
/*
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                .AllowCredentials()
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});
*/

var app = builder.Build();

// 🔧 Configure the HTTP request pipeline

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();      // Enables Swagger middleware (API docs)
    app.UseSwaggerUI();    // Enables interactive UI for testing APIs
}

app.UseCors("AllowAll");   // 🔓 Applies the CORS policy to allow cross-origin frontend requests

app.UseHttpsRedirection(); // 🔐 Redirects all HTTP requests to HTTPS

app.UseAuthorization();    // Handles authorization for endpoints

app.MapControllers();      // Maps controller routes (e.g., /Entertainers)

app.Run();                 // Starts the application
