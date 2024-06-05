using AutoMapper;
using CMS_API.Data;
using CMS_API.Models.Domain;
using CMS_API.Models.DTO;
using CMS_API.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CMS_API.Controllers
{
    // https://localhost:port/api/customers
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerRepository customerRepository;
        private readonly IMapper mapper;
        private readonly ILogger<CustomersController> logger;

        public CustomersController( ICustomerRepository customerRepository, 
            IMapper mapper,
            ILogger<CustomersController> logger)
        {
            this.customerRepository = customerRepository;
            this.mapper = mapper;
            this.logger = logger;
        }

        // GET ALL CUSTOMERS
        // GET: https://localhost:port/api/customers
        [HttpGet]
        public async Task<IActionResult> GetAll() {
            // Get Data from Database - Domain models using Repository pattern
            var customersDomain = await customerRepository.GetAllCustomersAsync();

            // Map Domain Models to DTO with automapper
            var customersDto = mapper.Map<List<CustomerDto>>(customersDomain);
            // Return DTO
            return Ok(customersDto);
        }

        // GET SINGLE CUSTOMER (Get Customer By ID)
        // GET: https://localhost:port/api/customers/{id}
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            // Get Customer Domain Model From Database
            var customerDomain = await customerRepository.GetCustomerByIdAsync(id);

            if (customerDomain == null)
            {
                return NotFound();
            }

            // Return DTO back to client
            return Ok(mapper.Map<CustomerDto>(customerDomain));
        }

        // CREATE NEW CUSTOMER
        // POST: https://localhost:port/api/customers
        [HttpPost]
        public async Task<IActionResult> CreateNew([FromBody] AddCustomerRequestDto addCustomerRequestDto) {
            try
            {
                // Map or Convert DTO to Domain model
                var customerDomainModel = mapper.Map<Customer>(addCustomerRequestDto);

                // Use Domain model to create Customer
                customerDomainModel = await customerRepository.CreateCustomerAsync(customerDomainModel);

                // Map Domain model back to DTO
                var customerDto = mapper.Map<CustomerDto>(customerDomainModel);

                return CreatedAtAction(nameof(GetById), new { id = customerDto.CustomerId }, customerDto);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(new { message = ex.Message });
            }         
        }

        // Update customer
        // PUT: https://localhost:port/api/customers/{id}
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateCustomerRequestDto updateCustomerRequestDto)
        {

            // Map DTO to Domain Model
            var customerDomainModel = mapper.Map<Customer>(updateCustomerRequestDto);

            // Check if customer exists
            customerDomainModel = await customerRepository.UpdateCustomerAsync(id, customerDomainModel);

            if (customerDomainModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<CustomerDto>(customerDomainModel));
        }

        // Delete Customer
        // DELETE: https://localhost:port/api/customers/{id}
        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var regionDomainModel = await customerRepository.DeleteCustomerAsync(id);

            if (regionDomainModel == null)
            {
                return NotFound();
            }

            return Ok(mapper.Map<CustomerDto>(regionDomainModel));
        }
    }
}
