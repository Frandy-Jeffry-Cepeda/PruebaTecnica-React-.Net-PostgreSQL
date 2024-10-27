using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Services;

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

        [HttpGet("Get-Employee-Data-ForUpdate")]
            public async Task<IActionResult> GetUserForUpdate()
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                if (string.IsNullOrEmpty(userId) || !int.TryParse(userId, out int parsedUserId))
                {
                    return BadRequest(new { message = "ID de usuario no válido." });
                }

                var employee = await _userSelfService.GetEmployeeInfoForUpdate(parsedUserId);
                if (employee == null)
                    return NotFound(new { message = "Usuario no encontrado." });

                return Ok(employee);
            }

        [HttpPut("Update-Employee/{id}")]
        public async Task<IActionResult> UpdateUser([FromRoute] int id, [FromBody] EmployeeDto employeeDto)
        {
            var authenticatedUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(authenticatedUserId) || !int.TryParse(authenticatedUserId, out int parsedUserId))
                return BadRequest(new { message = "ID de usuario no válido." });

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (parsedUserId != id)
                return Unauthorized(new { message = "No tienes permiso para actualizar este usuario." });

            var result = await _userSelfService.UpdateEmployeeAsync(id, employeeDto);
            if (!result)
                return NotFound(new { message = "Usuario no encontrado." });

            return NoContent();
        }

    }
}
