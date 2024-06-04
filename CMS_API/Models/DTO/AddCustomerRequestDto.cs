using System.ComponentModel.DataAnnotations;

namespace CMS_API.Models.DTO
{
    public class AddCustomerRequestDto
    {
        public required string FirstName { get; set; }

        public required string LastName { get; set; }

        public required string Email { get; set; }

        public required string Phone { get; set; }

        public string? Address { get; set; }
    }
}
