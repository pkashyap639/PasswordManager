using System.ComponentModel.DataAnnotations;

namespace PasswordApi.Models.DTO
{
    public class AddPassword
    {
        public string SiteName { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }
        public string Url { get; set; }
        public string Notes { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public Guid AppUserId { get; set; }
    }
}
