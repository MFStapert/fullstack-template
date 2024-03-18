var builder = WebApplication.CreateBuilder(args);

var app = builder.Build();

app.UseHttpsRedirection();

app.MapGet("/cms", () =>
{
    return "hello cms";
});

app.MapGet("/site", () =>
{
    return "hello site";
});

app.Run();
