using Activity_App.services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Persistance;
using System.Text;

namespace Activity_App.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration _config)
        {
            services.AddIdentityCore<AppUser>(options =>
            {
                // Password settings
                options.Password.RequireNonAlphanumeric = false;
                options.User.RequireUniqueEmail = true;
                //options.Password.RequireDigit = true;
                //options.Password.RequireNonAlphanumeric = false;
                //options.Password.RequireUppercase = true;
                //options.Password.RequireLowercase = false;

                // Lockout settings
               // options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
               // options.Lockout.MaxFailedAccessAttempts = 5;
               // options.Lockout.AllowedForNewUsers = true;

                // User settings
               // options.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<MyContext>();
            //.AddDefaultTokenProviders(); // This includes token providers for password reset, email confirmation, etc.

            // Configure token settings (if needed)
            // services.Configure<IdentityOptions>(options =>
            // {
            //     options.Tokens.EmailConfirmationTokenProvider = "email";
            //     options.SignIn.RequireConfirmedEmail = true;
            // });

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["TokenKey"]));

            // we configure our authintication to use our token that we created in tokenService File 
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });



            services.AddScoped<TokenService>();

            return services;
        }
    }
}
