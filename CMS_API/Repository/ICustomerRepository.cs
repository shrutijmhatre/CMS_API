using CMS_API.Models.Domain;

namespace CMS_API.Repository
{
    public interface ICustomerRepository
    {
        Task<List<Customer>> GetAllCustomersAsync();
    }
}
