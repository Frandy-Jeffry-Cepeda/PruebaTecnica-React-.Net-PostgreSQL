using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Services;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Employee")]
    public class UserController : ControllerBase
    {
        private readonly UserEmployee _userSelfService;

        public UserController(UserEmployee userSelfService)
        {
            _userSelfService = userSelfService;
        }

        [HttpGet("Get-Employee")]
        public async Task<IActionResult> GetUserById()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int parsedUserId))
            {
                return BadRequest(new { message = "ID de usuario no válido." });
            }

            var employee = await _userSelfService.GetEmployeeByIdAsync(parsedUserId);
            if (employee == null)
                return NotFound(new { message = "Usuario no encontrado." });

            return Ok(employee);
        }

        [HttpPut("Update-Employee")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDto updateUserDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int parsedUserId))
                return BadRequest(new { message = "ID de usuario no válido." });

            var result = await _userSelfService.UpdateEmployeeAsync(parsedUserId, updateUserDto);
            if (!result)
                return NotFound(new { message = "Usuario no encontrado." });

            return NoContent();
        }
    }
}
