using Microsoft.EntityFrameworkCore;
using Persistance;
using Persistence;
using System.Linq.Expressions;

namespace Activity_App
{
    public  class Program
    {
            public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<MyContext>(options =>
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();

            app.MapControllers();

           using  var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;

            // this code for seeding data into the database
            try
            {
                var context = services.GetRequiredService<MyContext>();
                await context.Database.MigrateAsync();
                await Seed.SeedData(context);
            } catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "Error Accord While Migration");
            }
            app.Run();
        }
    }
}