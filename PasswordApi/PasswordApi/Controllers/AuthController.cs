using AutoMapper;
using BCrypt.Net;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PasswordApi.Data;
using PasswordApi.Models;
using PasswordApi.Models.DTO;

namespace PasswordApi.Controllers
{
    [EnableCors]
    [Controller]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly PasswordContext context;
        private readonly IMapper mapper;

        public AuthController(PasswordContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> CreateAccount([FromBody]CreateUserDTO UserDetails)
        {
            //convert DTo To domain
            var UserDetailDomain = mapper.Map<AppUser>(UserDetails);
            // check if user alread exists
            try
            {
                var checkUserExists = await context.AppUsers.Where(x => x.UserEmail == UserDetailDomain.UserEmail).FirstOrDefaultAsync();
                if (checkUserExists != null)
                {
                    return BadRequest("User Already Exists");
                }
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            try
            {
                var saveUser = await context.AppUsers.AddAsync(new AppUser { UserName = UserDetailDomain.UserName, UserEmail = UserDetailDomain.UserEmail, Password = BCrypt.Net.BCrypt.HashPassword(UserDetailDomain.Password)});
                await context.SaveChangesAsync();
                return Ok(new { Message = "User Created"});
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
