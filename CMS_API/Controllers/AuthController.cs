using CMS_API.Models.DTO;
using CMS_API.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManager;
        private readonly ITokenRepository tokenRepository;

        public AuthController(UserManager<IdentityUser> userManager, ITokenRepository tokenRepository)
        {
            this.userManager = userManager;
            this.tokenRepository = tokenRepository;
        }

        // POST: /api/Auth/Register
        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDto registerRequestDto)
        {
            var identityUser = new IdentityUser
            {
                UserName = registerRequestDto.Username,
                Email = registerRequestDto.Username
            };

            var identityResult = await userManager.CreateAsync(identityUser, registerRequestDto.Password);

            if (identityResult.Succeeded)
            {
                // Create Token

                var jwtToken = tokenRepository.CreateJWTToken(identityUser);

                var response = new JWTResponseDto
                {
                    JwtToken = jwtToken
                };
                return Ok(response);
            }
            else
            {
                // Handle creation errors
                foreach (var error in identityResult.Errors)
                {
                    ModelState.AddModelError("error", error.Description);
                }
                return BadRequest(ModelState);
            }
        }

        // POST: /api/Auth/Login
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginRequestDto loginRequestDto)
        {
            var user = await userManager.FindByEmailAsync(loginRequestDto.Username);

            if (user != null)
            {
                var checkPasswordResult = await userManager.CheckPasswordAsync(user, loginRequestDto.Password);

                if (checkPasswordResult)
                {
                        // Create Token

                        var jwtToken = tokenRepository.CreateJWTToken(user);

                        var response = new JWTResponseDto
                        {
                            JwtToken = jwtToken
                        };

                        return Ok(response);
                  
                }
            }

            return BadRequest("Username or password incorrect");
        }
    }
}
