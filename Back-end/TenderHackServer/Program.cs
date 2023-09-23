using Microsoft.Extensions.ML;
using System.Reflection;
using TenderHack.Core;
using TenderHackServer.UseCases.GetAnswer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(options =>
{
    var basePath = AppContext.BaseDirectory;
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(basePath, xmlFile);
    options.IncludeXmlComments(xmlPath);
});

builder.Services.AddPredictionEnginePool<string, ModelOutput>()
    .FromFile(modelName: "SentimentAnalysisModel", filePath: "sentiment_model.zip", watchForChanges: true);

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetAnswerQuery).Assembly));

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
