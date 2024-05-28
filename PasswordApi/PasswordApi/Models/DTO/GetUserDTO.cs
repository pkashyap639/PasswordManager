using System.ComponentModel.DataAnnotations;

namespace PasswordApi.Models.DTO
{
    public class GetUserDTO
    {
        public Guid AppUserId { get; set; } 
        public string UserName { get; set; }
        public string UserEmail { get; set; }
    }
}
