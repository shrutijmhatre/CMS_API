﻿using CMS_API.Models.Domain;

namespace CMS_API.Repository
{
    public interface ICustomerRepository
    {
        Task<List<Customer>> GetAllCustomersAsync();

        Task<Customer?> GetCustomerByIdAsync(Guid id);

        Task<Customer> CreateCustomerAsync(Customer customer);

        Task<Customer?> UpdateCustomerAsync(Guid id, Customer customer);

        Task<Customer?> DeleteCustomerAsync(Guid id);
    }
}
