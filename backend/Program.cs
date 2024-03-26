using Microsoft.EntityFrameworkCore;
using App.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<DBContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

var app = builder.Build();

var scope = app.Services.CreateScope();
var db = scope.ServiceProvider.GetRequiredService<DBContext>();       
db.Database.EnsureCreated();

app.UseHttpsRedirection();
app.MapGet("/cms", (DBContext db) =>
{
    return db.Test.Where(t => t.Id == 1).FirstOrDefault().Text;
});

app.MapGet("/site", (DBContext db) =>
{
    return db.Test.Where(t => t.Id == 2).FirstOrDefault().Text;
});

app.Run();
