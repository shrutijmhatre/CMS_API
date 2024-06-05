import React from "react";
import { useQuery } from "react-query";
import * as apiService from "../api-service";
import { CustomerType } from "../types";

const HomePage = () => {
  const TableHeaderLabels = [
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Address",
  ];

  const { data: customersListData, isLoading: isLoadingCustomers } = useQuery(
    "fetchCustomersList",
    apiService.fetchCustomerList
  );

  return (
    <div>
      <div className="bg-blue-500">
        <h1 className="text-3xl font-bold text-center p-5 text-white">
          Customer Management System
        </h1>
      </div>

      <table className="table-fixed my-5 w-full">
        <thead>
          <tr className="w-full justify-between text-xl bg-slate-300 py-4">
            {TableHeaderLabels.map((headerLabel: string, index: number) => (
              <th key={headerLabel + index} className="w-full">
                {headerLabel}
              </th>
            ))}
            <th className="w-1/4"></th>
          </tr>
        </thead>
        <tbody>
          {isLoadingCustomers ? (
            <h3>Loading..</h3>
          ) : (
            customersListData?.map((customer: CustomerType) => (
              <tr
                key={customer.customerId}
                className="w-full h-full justify-between text-center border-b-2 border-slate-300 border-solid"
              >
                <td className="w-full py-2">{customer.firstName}</td>
                <td className="w-full py-2">{customer.lastName}</td>
                <td className="w-full py-2">{customer.email}</td>
                <td className="w-full py-2">{customer.phone}</td>
                <td className="w-full py-2">{customer.address}</td>
                <button>Edit</button>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
