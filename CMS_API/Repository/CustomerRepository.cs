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

        public async Task<Customer?> UpdateCustomerAsync(Guid id, Customer customer)
        {
            var existingCustomer = await dbContext.Customers.FirstOrDefaultAsync(x => x.CustomerId == id);

            if (existingCustomer == null)
            {
                return null;
            }

            existingCustomer.FirstName = customer.FirstName;
            existingCustomer.LastName = customer.LastName;
            existingCustomer.Email = customer.Email;
            existingCustomer.Phone = customer.Phone;
            existingCustomer.Address = customer.Address;

            await dbContext.SaveChangesAsync();
            return existingCustomer;
        }

        public async Task<Customer?> DeleteCustomerAsync(Guid id)
        {
            var existingCustomer = await dbContext.Customers.FirstOrDefaultAsync(x => x.CustomerId == id);

            if (existingCustomer == null)
            {
                return null;
            }

            dbContext.Customers.Remove(existingCustomer);
            await dbContext.SaveChangesAsync();
            return existingCustomer;
        }
    }
}
