using Activity_App.Extensions;
using Activity_App.Middleware;
using Application.Activities;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
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

            // Startup file ( House Keeper ) => in Extenstion file
            builder.Services.AddApplicationServices(builder.Configuration);

            // add identity service for Form login
            builder.Services.AddIdentityServices(builder.Configuration);

            // Add services to the container.

            builder.Services.AddControllers(options =>
            {
                var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build(); // auth users 
                options.Filters.Add(new AuthorizeFilter(policy)); // filter the user and allow only auth users
            });
            

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            app.UseMiddleware<ExceptionMiddleware>();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("MyPolicy");

            app.UseAuthentication(); // we authicate before we authorize

            app.UseAuthorization();

            app.MapControllers();

           using  var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;

            // this code for seeding data into the database
            try
            {
                var context = services.GetRequiredService<MyContext>();
                // we import The service of the app user to seed some data 
                var userManagerService = services.GetRequiredService<UserManager<AppUser>>();
                await context.Database.MigrateAsync();
                await Seed.SeedData(context, userManagerService);
            } catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "Error Accord While Migration");
            }
            app.Run();
        }
    }
}