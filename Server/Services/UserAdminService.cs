using Microsoft.EntityFrameworkCore;
using Server.Data;
using System.Threading.Tasks;

namespace Server.Services
{
    public class UserAdminService
    {
        private readonly ApplicationDbContext _context;

        public UserAdminService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserDto>> GetAllEmployeesAsync()
        {
            var users = await _context.Users.ToListAsync();
            return users.Select(user => new UserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                UserName = user.UserName,
                Email = user.Email,
                Role = user.Role.ToString(),
                Departamento = user.Departamento
            }).ToList();
        }

        public async Task<UserDto> GetEmployeeByIdAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return null;

            return new UserDto
            {
                Id = user.Id,
                FullName = user.FullName,
                UserName = user.UserName,
                Email = user.Email,
                PasswordHash = user.PasswordHash,
                Role = user.Role.ToString(),
                Departamento = user.Departamento
            };
        }

        public async Task<User> CreateEmployeeAsync(RegisterDto registerDto)
        {
            var newUser = new User
            {
                FullName = registerDto.FullName,
                UserName = registerDto.UserName,
                Email = registerDto.Email,
                PasswordHash = registerDto.Password,
                Role = (UserRole)Enum.Parse(typeof(UserRole), registerDto.Role),
                Departamento = registerDto.Departamento
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            return newUser;
        }

        public async Task<bool> UpdateEmployeeAsync(int id, UpdateUserDto updateUserDto)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            user.FullName = updateUserDto.FullName;
            user.UserName = updateUserDto.UserName;
            user.Email = updateUserDto.Email;
            user.Departamento = updateUserDto.Departamento;
            user.Role = (UserRole)Enum.Parse(typeof(UserRole), updateUserDto.Role.ToString());
            user.PasswordHash = updateUserDto.PasswordHash;

            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
