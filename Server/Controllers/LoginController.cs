using Microsoft.AspNetCore.Mvc;
using Server.Services;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;

        public AuthController(AuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Autenticación del usuario
            var user = await _authService.AuthenticateUserAsync(loginDto.Email, loginDto.Password);
            if (user == null)
                return Unauthorized(new { message = "Credenciales inválidas." });

            // Generar token JWT
            var token = _authService.GenerateJwtToken(user);

            var authResponse = new AuthResponseDto
            {
                Success = true,
                Message = "Autenticación exitosa.",
                Token = token,
                User = new UserDto
                {
                    FullName = user.FullName,
                    UserName = user.UserName,
                    Email = user.Email,
                    Role = user.Role.ToString(),
                    Departamento = user.Departamento
                }
            };

            return Ok(authResponse);
        }
    }
}
