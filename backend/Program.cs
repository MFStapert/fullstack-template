var builder = WebApplication.CreateBuilder(args);


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/cms", () =>
{
    return "hello cms";
})
.WithOpenApi();

app.MapGet("/site", () =>
{
    return "hello site";
})
.WithOpenApi();

app.Run();
