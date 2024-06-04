using Microsoft.AspNetCore.Mvc;

namespace CMS_API.Models.Domain
{
    public class Customer
    {
        public Guid CustomerId { get; set; }
        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string Email { get; set; }

        public required string Phone { get; set; }

        public required string Address { get; set; }
    }
}
