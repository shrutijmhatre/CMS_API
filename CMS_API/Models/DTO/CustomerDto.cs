namespace CMS_API.Models.DTO
{
    public class CustomerDto
    {
        public Guid CustomerId { get; set; }

        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string Email { get; set; }

        public required string Phone { get; set; }

        public string? Address { get; set; }
    }
}
