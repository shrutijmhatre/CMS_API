using CMS_API.Data;
using CMS_API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace CMS_API.Repository
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly CustomerDbContext dbContext;

        public CustomerRepository(CustomerDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        public async Task<List<Customer>> GetAllCustomersAsync()
        {
            return await dbContext.Customers.ToListAsync();
        }

        public async Task<Customer?> GetCustomerByIdAsync(Guid id)
        {
            return await dbContext.Customers.FirstOrDefaultAsync(x => x.CustomerId == id);
        }

        public async Task<Customer> CreateCustomerAsync(Customer customer)
        {
            await dbContext.Customers.AddAsync(customer);
            await dbContext.SaveChangesAsync();
            return customer;
        }
    }
}
