using System.ComponentModel.DataAnnotations;

namespace PasswordApi.Models.DTO
{
    public class SendProfileDTO
    {
        public string UserName { get; set; }
       
        public string UserEmail { get; set; }
        
    }
}
