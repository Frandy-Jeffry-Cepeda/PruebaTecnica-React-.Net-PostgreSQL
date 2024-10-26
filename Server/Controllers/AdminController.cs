using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server.Services;
using System.Threading.Tasks;


namespace Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly UserAdminService _userService;

        public AdminController(UserAdminService userService)
        {
            _userService = userService;
        }

        [HttpGet("Get-All-Employee")]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetAllEmployeesAsync();
            return Ok(users);
        }

        [HttpGet("Get-Employee/{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            var user = await _userService.GetEmployeeByIdAsync(id);
            if (user == null)
                return NotFound(new { message = "Usuario no encontrado." });

            return Ok(user);
        }

        [HttpPost("Create-Employee")]
        public async Task<IActionResult> CreateUser([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var newUser = await _userService.CreateEmployeeAsync(registerDto);
            return CreatedAtAction(nameof(GetUserById), new { id = newUser.Id }, newUser);
        }

        [HttpPut("Update-Employee/{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto updateUserDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _userService.UpdateEmployeeAsync(id, updateUserDto);
            if (!result)
                return NotFound(new { message = "Usuario no encontrado." });

            return NoContent();
        }

        [HttpDelete("Delete-Employee/{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var result = await _userService.DeleteEmployeeAsync(id);
            if (!result)
                return NotFound(new { message = "Usuario no encontrado." });

            return NoContent();
        }
    }
}
