import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiService from "../api-service";
import { useNavigate } from "react-router-dom";

export type SubmitFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
};

const NewPage = () => {
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SubmitFormData>();

  const { mutate, isLoading: isCreatingNewCustomer } = useMutation(
    (payload: SubmitFormData) => apiService.addCustomer(payload),
    {
      onSuccess: async () => {
        navigate("/");
      },
      onError: (error: Error) => {
        console.log(error.message);
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    mutate(data);
  });

  if (isCreatingNewCustomer) {
    return <h3>Creating New Customer...</h3>;
  }

  return (
    <div>
      <span className="text-2xl">Add New Customer</span>
      <form className="grid grid-cols-2 m-10 gap-5" onSubmit={onSubmit}>
        <label>
          First Name:
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("firstName", {
              required: "First Name field is required",
            })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label>
          Last Name:
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("lastName", {
              required: "Last Name field is required",
            })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
        <label>
          Email:
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </label>
        <label>
          Phone:
          <input
            type="phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("phone", {
              required: "Phone is required",
            })}
          />
          {errors.phone && (
            <span className="text-red-500">{errors.phone.message}</span>
          )}
        </label>
        <label className="col-span-2">
          Address:
          <textarea
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("address", {
              required: "Address is required",
            })}
          />
          {errors.address && (
            <span className="text-red-500">{errors.address.message}</span>
          )}
        </label>
        <button
          type="submit"
          className="my-5 flex bg-blue-600 items-center text-white px-3 py-1 font-bold w-20"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPage;
