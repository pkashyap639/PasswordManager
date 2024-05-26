using Microsoft.EntityFrameworkCore;
using PasswordApi.Models;

namespace PasswordApi.Data
{
    public class PasswordContext:DbContext
    {
        public PasswordContext(DbContextOptions<PasswordContext> options):base(options)
        {
            
        }
        public DbSet<AppUser> AppUsers { get; set; }
        public DbSet<PasswordEntry> PasswordEntries { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<PasswordEntry>().HasOne(x=>x.AppUser).WithMany(x=>x.PasswordEntries).HasForeignKey(x=>x.AppUserId);
        }
    }
}
