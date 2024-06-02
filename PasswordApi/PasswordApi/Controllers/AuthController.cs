using AutoMapper;
using BCrypt.Net;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using PasswordApi.Data;
using PasswordApi.Models;
using PasswordApi.Models.DTO;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace PasswordApi.Controllers
{
    [EnableCors]
    [Controller]
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly PasswordContext context;
        private readonly IMapper mapper;
        private readonly IConfiguration builder;

        public AuthController(PasswordContext context, IMapper mapper, IConfiguration builder)
        {
            this.context = context;
            this.mapper = mapper;
            this.builder = builder;
        }

        [HttpGet]
        [Route("id")]
        public async Task<IActionResult> getProfileData([FromQuery]Guid id)
        {
            try
            {
                var checkUserExists = await context.AppUsers.Where(x => x.AppUserId == id).FirstOrDefaultAsync();
                if (checkUserExists == null)
                {
                    return BadRequest("User Not Found");
                }
                return Ok(mapper.Map<SendProfileDTO>(checkUserExists));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        public async Task<IActionResult> CreateAccount([FromBody] CreateUserDTO UserDetails)
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
            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            try
            {
                var saveUser = await context.AppUsers.AddAsync(new AppUser { UserName = UserDetailDomain.UserName, UserEmail = UserDetailDomain.UserEmail, Password = BCrypt.Net.BCrypt.HashPassword(UserDetailDomain.Password) });
                await context.SaveChangesAsync();
                return Ok(new { Message = "User Created" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /*public string generateToken(AppUser existingUser)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
                    {
                        new Claim("UserEmail", existingUser.UserEmail.ToString()),
                        new Claim("UserName", existingUser.UserName),
                        new Claim("UserId", existingUser.AppUserId.ToString())

                    };
            var token = new JwtSecurityToken(
                builder["Jwt:Issuer"],
                builder["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(60),
                signingCredentials: credentials
                );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }*/

        [HttpPost]
        [Route("signin")]
        public async Task<IActionResult> signInUser([FromBody]LoginUserDTO userDto)
        {
            // convert dto to domain
            // check if user exists
            try
            {
                var existingUser = await context.AppUsers.Where(x => x.UserEmail == userDto.UserEmail).FirstOrDefaultAsync();
                if(existingUser == null)
                {
                    return BadRequest(new { ErrorMessage = "User Does Not Exists" });
                }

                //match credentials
                if(BCrypt.Net.BCrypt.Verify(userDto.Password, existingUser.Password))
                {
                    // get token
                    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder["Jwt:Key"]));
                    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
                    var claims = new[]
                            {
                        new Claim("UserEmail", existingUser.UserEmail.ToString()),
                        new Claim("UserName", existingUser.UserName),
                        new Claim("UserId", existingUser.AppUserId.ToString())

                    };
                    var token = new JwtSecurityToken(
                        builder["Jwt:Issuer"],
                        builder["Jwt:Audience"],
                        claims,
                        expires: DateTime.Now.AddMinutes(60),
                        signingCredentials: credentials
                        );
                    return Ok(new { Token = new JwtSecurityTokenHandler().WriteToken(token) });

                }
                return BadRequest(new { ErrorMessage = "Invalid Credentials" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("id")]
        public async Task<IActionResult> updateProfile([FromQuery] Guid id, [FromBody] UpdateUserDTO userDto)
        {
            try
            {
                var existingUser = await context.AppUsers.Where(x => x.AppUserId == id).FirstOrDefaultAsync();
                if (existingUser == null)
                {
                    return NotFound("User not found.");
                }
                existingUser.UserName = userDto.UserName;
                existingUser.UserEmail = userDto.UserEmail;
                existingUser.Password = BCrypt.Net.BCrypt.HashPassword(userDto.Password);
                // Save the changes to the database
                await context.SaveChangesAsync();

                return Ok(new { Message = "Profile updated successfully." });
            }
            catch(Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
