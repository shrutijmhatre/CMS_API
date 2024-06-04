using AutoMapper;
using CMS_API.Data;
using CMS_API.Models.DTO;
using CMS_API.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS_API.Controllers
{
    // https://localhost:port/api/customers
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly CustomerDbContext dbContext;
        private readonly ICustomerRepository customerRepository;
        private readonly IMapper mapper;

        public CustomersController(CustomerDbContext dbContext, ICustomerRepository customerRepository, IMapper mapper)
        {
            this.dbContext = dbContext;
            this.customerRepository = customerRepository;
            this.mapper = mapper;
        }

        // GET ALL CUSTOMERS
        // GET: https://localhost:port/api/customers
        [HttpGet]
        public async Task<IActionResult> GetAllCustomers() {
            // Get Data from Database - Domain models using Repository pattern
            var customersDomain = await customerRepository.GetAllCustomersAsync();

            // Map Domain Models to DTO with automapper
            var customersDto = mapper.Map<List<CustomerDto>>(customersDomain);
            // Return DTO
            return Ok(customersDto);
        }
    }
}
