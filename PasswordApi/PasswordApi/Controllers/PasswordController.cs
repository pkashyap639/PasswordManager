using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using PasswordApi.Data;
using PasswordApi.Models;
using PasswordApi.Models.DTO;

namespace PasswordApi.Controllers
{
    [EnableCors]
    [ApiController]
    [Route("api/[controller]")]
    public class PasswordController : Controller
    {
        private readonly IMapper mapper;
        private readonly PasswordContext context;

        public PasswordController(IMapper mapper, PasswordContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpPost]
        public async Task<IActionResult> SaveNewPassword([FromBody]AddPassword passwordDto)
        {
            // convert dto to domain
            var newPassword = mapper.Map<PasswordEntry>(passwordDto);
            try
            {
                var savePwd = await context.PasswordEntries.AddAsync(newPassword);
                await context.SaveChangesAsync();
                return Ok(new { Message = "Password Saved" });
            }catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }
    }
}
