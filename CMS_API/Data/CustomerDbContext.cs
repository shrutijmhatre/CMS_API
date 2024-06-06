using CMS_API.Models.Domain;
using Microsoft.EntityFrameworkCore;

namespace CMS_API.Data
{
    public class CustomerDbContext: DbContext
    {
        public CustomerDbContext(DbContextOptions<CustomerDbContext> dbContextOptions): base(dbContextOptions)
        {
                
        }

        public DbSet<Customer> Customers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Customer>()
                .HasIndex(c => c.Email)
                .IsUnique();

            base.OnModelCreating(modelBuilder);

            // Seed data for Customers
            var customers = new List<Customer>
            {
                new Customer
                {
                    CustomerId = Guid.Parse("6884f7d7-ad1f-4101-8df3-7a6fa7387d81"),
                    FirstName = "John",
                    LastName = "Doe",
                    Email = "john@example.com",
                    Phone = "+1 44433322",
                    Address = "California"
                },
                new Customer
                {
                    CustomerId = Guid.Parse("14ceba71-4b51-4777-9b17-46602cf66153"),
                    FirstName = "Jane",
                    LastName = "Doe",
                    Email = "jane@example.com",
                    Phone = "+ 5555522",
                    Address = "Los Angeles"
                },
            };

            modelBuilder.Entity<Customer>().HasData(customers);
        }
    }
}
