using Activity_App.Dto;
using Activity_App.services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Activity_App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    // we will not use midator or ingrated it in CQRS | i will seperate it from the pattern
    // ( because it didn't deal with our application layer )
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            _userManager = userManager;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email); // find a user from database by email

            if (user == null) return Unauthorized(); 

            // check the password if its' right
            var checkPassword = await _userManager.CheckPasswordAsync(user, loginDto.Password); 

            // if the passwod is correct start mapping
            if (checkPassword)
            {
                return UserDtoObject(user);
            }
                
            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.UserName))
            {
                return BadRequest("username already taken!");
            }

            if(await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                return BadRequest("Email Already Exist!");
            }

            var user = new AppUser
            {
                DisplayName = registerDto.DisplayName,
                Email = registerDto.Email,
                UserName = registerDto.UserName
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if(result.Succeeded)
            {
                return UserDtoObject(user);
            }

            return BadRequest(result.Errors);
        }

        private UserDto UserDtoObject(AppUser user)
        {
            return new UserDto
            {
                DisplayName = user.DisplayName,
                Token = _tokenService.CreateToken(user),
                image = null,
                UserName = user.UserName
            };
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            // we can access our user because we have successful sign in 
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return UserDtoObject(user);
        }
    }
}
