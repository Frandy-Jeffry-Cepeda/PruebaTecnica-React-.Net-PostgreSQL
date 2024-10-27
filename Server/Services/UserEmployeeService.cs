
using Server.Data;


namespace Server.Services
{
    public class UserEmployee
    {
        private readonly ApplicationDbContext _context;

        public UserEmployee(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<UserDto> GetEmployeeByIdAsync(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return null;

            return new UserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                UserName = user.UserName,
                Email = user.Email,
                Role = user.Role.ToString(),
                Departamento = user.Departamento
            };
        }

        public async Task<UserDto> GetEmployeeInfoForUpdate(int userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null) return null;

            return new UserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                UserName = user.UserName,
                Email = user.Email,
            };
        }

        public async Task<bool> UpdateEmployeeAsync(int id, EmployeeDto employeeDto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            user.FullName = employeeDto.FullName;
            user.UserName = employeeDto.UserName;
            user.Email = employeeDto.Email;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
