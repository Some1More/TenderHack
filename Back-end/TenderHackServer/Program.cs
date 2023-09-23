using System.Reflection;
using TenderHack.Client;
using TenderHackServer.UseCases.Abstractions;
using TenderHackServer.UseCases.GetAnswer;
using Refit;
using TenderHack.DataAccess.Repositories;
using TenderHack.DataAccess;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddDbContext<Context>();

builder.Services.AddSwaggerGen(options =>
{
    var basePath = AppContext.BaseDirectory;
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(basePath, xmlFile);
    options.IncludeXmlComments(xmlPath);
});

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetAnswerQuery).Assembly));
builder.Services.AddScoped<IMachineLearningRepository, MachineLearningRepository>();
builder.Services.AddScoped<IMessageRepository, MessageRepository>();

// refit клиент
builder.Services.AddRefitClient<IMLModelClient>()
    .ConfigureHttpClient(c => c.BaseAddress = new Uri($"http://127.0.0.1:8000"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
