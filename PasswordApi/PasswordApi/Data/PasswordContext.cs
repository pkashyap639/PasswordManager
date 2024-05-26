using Microsoft.EntityFrameworkCore;

namespace PasswordApi.Data
{
    public class PasswordContext:DbContext
    {
        public PasswordContext(DbContextOptions<PasswordContext> options):base(options)
        {
            
        }
    }
}
