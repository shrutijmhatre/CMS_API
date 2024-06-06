using System.ComponentModel.DataAnnotations;

namespace CMS_API.Models.DTO
{
    public class UpdateCustomerRequestDto
    {
        [Required(ErrorMessage = "First name is required")]
        [StringLength(20)]
        public required string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        [StringLength(20)]
        public required string LastName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public required string Email { get; set; }

        [Required]
        [RegularExpression("^\\+?(\\d{1,3})?[-.\\s]?(\\(?\\d{1,4}\\)?)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$", ErrorMessage = "Phone must be valid")]
        public required string Phone { get; set; }

        [Required(ErrorMessage = "Address is required")]
        [StringLength(200)]
        public required string Address { get; set; }
    }
}
