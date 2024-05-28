using System.ComponentModel.DataAnnotations;

namespace PasswordApi.Models.DTO
{
    public class CreateUserDTO
    {
        public string UserName { get; set; }
        public string UserEmail { get; set; }
        public string Password { get; set; }
    }
}
