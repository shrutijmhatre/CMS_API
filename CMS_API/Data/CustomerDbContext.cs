using CMS_API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace CMS_API.Data
{
    public class CustomerDbContext: DbContext
    {
        public CustomerDbContext(DbContextOptions dbContextOptions): base(dbContextOptions)
        {
                
        }

        public DbSet<Customer> Customers { get; set; }
    }
}
