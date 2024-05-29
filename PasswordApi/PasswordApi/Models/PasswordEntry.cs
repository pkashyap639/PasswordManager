using System.ComponentModel.DataAnnotations;

namespace PasswordApi.Models
{
    public class PasswordEntry
    {
        [Key]
        public Guid PasswordId { get; set; } = Guid.NewGuid();
        [Required]
        [MaxLength(300)]
        public string SiteName { get; set; }
        [Required]
        [MaxLength(250)]
        public string Username { get; set; }
        [Required]
        [MaxLength(250)]
        public string Password { get; set; }
        [Required]
        [MaxLength(250)]
        public string Url { get; set; }
        [MaxLength(500)]
        public string Notes { get; set; }
        [Required]
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public Guid AppUserId { get; set; }
        public AppUser AppUser { get; set; }
    }
}
