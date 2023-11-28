using System.ComponentModel.DataAnnotations;

namespace Activity_App.Dto
{

    // this Dto used when the user register so when recvive it in this formate 
    public class RegisterDto
    {
        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage = "Pass Must be Complex")]
        public string Password { get; set; }

        [Required]
        public string DisplayName { get; set; }

        [Required]
        public string UserName { get; set; }
    }
}
