using AutoMapper;
using CMS_API.Models.Domain;
using CMS_API.Models.DTO;

namespace CMS_API.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
                CreateMap<Customer, CustomerDto>().ReverseMap();
        }
    }
}
