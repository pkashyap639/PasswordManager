using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        public async Task<IActionResult> SaveNewPassword([FromBody] AddPassword passwordDto)
        {
            // convert dto to domain
            var newPassword = mapper.Map<PasswordEntry>(passwordDto);
            try
            {
                var savePwd = await context.PasswordEntries.AddAsync(newPassword);
                await context.SaveChangesAsync();
                return Ok(new { Message = "Password Saved" });
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpGet]
        [Route("Id")]
        public async Task<IActionResult> getVaultData([FromQuery] Guid Id)
        {
            try
            {
                var vaultData = await context.PasswordEntries.Where(x => x.AppUserId == Id).ToListAsync();
                if (vaultData == null) {
                    return BadRequest(new { Message = "No Data Exists" });
                }
                return Ok(mapper.Map<List<GetVaultDataDto>>(vaultData));
            }
            catch (Exception ex)
            {
                return BadRequest(new { ErrorMessage = ex.Message });
            }

        }

        [HttpGet]
        [Route("VaultId/UserId")]
        public async Task<IActionResult> getSingleVaultData([FromQuery] Guid VaultId, [FromQuery] Guid UserId)
        {
            try
            {
                var vaultData = await context.PasswordEntries.Where(x => x.AppUserId == UserId && x.PasswordId == VaultId).FirstOrDefaultAsync();
                if (vaultData == null)
                {
                    return BadRequest(new { Message = "No Data Exists" });
                }
                return Ok(mapper.Map<GetVaultDataDto>(vaultData));
            }
            catch (Exception ex)
            {
                return BadRequest(new { ErrorMessage = ex.Message });
            }
        }

        [HttpDelete]
        [Route("VaultId/UserId")]
        public async Task<IActionResult> deletePassword([FromQuery] Guid VaultId, [FromQuery] Guid UserId)
        {
            try
            {
                var vaultData = await context.PasswordEntries.Where(x => x.AppUserId == UserId && x.PasswordId == VaultId).FirstOrDefaultAsync();
                if (vaultData == null)
                {
                    return BadRequest(new { Message = "No Data Exists" });
                }
                context.Remove(vaultData);
                await context.SaveChangesAsync();
                return Ok(new { Message = "Data Deleted" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { ErrorMessage = ex.Message });
            }
        }
    }
}
