import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import * as apiService from "../api-service";
import { CustomerType } from "../types";
import { Link } from "react-router-dom";

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

  const queryClient = useQueryClient();

  const { mutate } = useMutation(apiService.deleteCustomer, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("fetchCustomersList");
    },
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  const deleteCustomerItem = (id: string) => {
    mutate(id);
  };

  if (isLoadingCustomers) {
    return <h3>Loading Customers...</h3>;
  }
  return (
    <div>
      <div className="bg-blue-500 py-4">
        <div className="container mx-auto flex justify-between">
          <span className="text-3xl mx-auto text-center text-white font-bold tracking-tight">
            Customer Management System
          </span>
          <Link
            to="/new"
            className="flex bg-white items-center text-blue-600 px-3 font-bold hover:bg-gray-100 rounded"
          >
            +Add
          </Link>
        </div>
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
          {customersListData?.map((customer: CustomerType) => (
            <tr
              key={customer.customerId}
              className="w-full h-full justify-between text-center border-b-2 border-slate-300 border-solid"
            >
              <td className="w-full py-2">{customer.firstName}</td>
              <td className="w-full py-2">{customer.lastName}</td>
              <td className="w-full py-2">{customer.email}</td>
              <td className="w-full py-2">{customer.phone}</td>
              <td className="w-full py-2">{customer.address}</td>
              <td className="w-full py-2">
                <div className="flex">
                  <Link
                    to={`/edit/${customer.customerId}`}
                    className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                      />
                    </svg>
                  </Link>
                  <button
                    onClick={() => deleteCustomerItem(customer.customerId)}
                    className="flex items-center text-blue-600 px-3 font-bold hover:bg-gray-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
