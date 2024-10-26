using System.ComponentModel.DataAnnotations;

public class LoginDto
{
    [Required(ErrorMessage = "El email es requerido")]
    [EmailAddress(ErrorMessage = "Formato de email inválido")]
    public string Email { get; set; }

    [Required(ErrorMessage = "La contraseña es requerida")]
    public string Password { get; set; }
}