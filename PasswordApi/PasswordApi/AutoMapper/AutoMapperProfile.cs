using AutoMapper;
using PasswordApi.Models;
using PasswordApi.Models.DTO;

namespace PasswordApi.AutoMapper
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile() {

            CreateMap<AppUser, CreateUserDTO>().ReverseMap();
        }
    }
}
