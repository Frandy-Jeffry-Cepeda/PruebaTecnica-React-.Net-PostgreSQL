using Microsoft.EntityFrameworkCore;


namespace Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

       public DbSet<User> Users {get; set;}

       protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

             modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(u => u.Email).IsUnique();
                entity.Property(u => u.FullName).IsRequired().HasMaxLength(100);
                entity.Property(u => u.UserName).IsRequired().HasMaxLength(50);
                entity.Property(u => u.Departamento).IsRequired().HasMaxLength(100);
                entity.Property(u => u.Role)
                      .HasConversion(
                          v => v.ToString(), 
                          v => (UserRole)Enum.Parse(typeof(UserRole), v)) 
                      .IsRequired()
                      .HasMaxLength(20); 

                entity.Property(u => u.PasswordHash).IsRequired();
            });

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword("Admin123");

            var adminUser = new User
            {
                Id = 1, 
                FullName = "Admin",
                UserName = "Admin",
                Email = "Admin@Admin.com",
                PasswordHash = hashedPassword,
                Role = UserRole.Admin,
                Departamento = "Administración",
                CreatedAt = DateTime.UtcNow
            };

            modelBuilder.Entity<User>().HasData(adminUser);
        }

    }
}
