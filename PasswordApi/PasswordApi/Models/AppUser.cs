using System.ComponentModel.DataAnnotations;

namespace PasswordApi.Models
{
    public class AppUser
    {
        [Key]
        public Guid AppUserId { get; set; } = Guid.NewGuid();
        [Required]
        [MaxLength(200)]
        public string UserName { get; set; }
        [Required]
        [MaxLength(200)]
        public string UserEmail { get; set; }
        [Required]
        [MaxLength(200)]
        public string Password { get; set; }
        public List<PasswordEntry> PasswordEntries { get; set; }
    }
}
