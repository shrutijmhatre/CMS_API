import React, { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as apiService from "../api-service";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";

export type EditFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
};

const EditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [cookies] = useCookies(["token"]);

  const { data: customerItemData, isLoading: isLoadingCustomerItem } = useQuery(
    ["fetchCustomerItem", id],
    () => apiService.fetchCustomerById(id || "", cookies.token),
    {
      enabled: !!id,
    }
  );

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<EditFormData>();

  const { mutate, isLoading: isEditingCustomer } = useMutation(
    (payload: EditFormData) =>
      apiService.updateCustomerById(payload, id || "", cookies.token),
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

  useEffect(() => {
    if (customerItemData) {
      setValue("firstName", customerItemData.firstName);
      setValue("lastName", customerItemData.lastName);
      setValue("email", customerItemData.email);
      setValue("phone", customerItemData.phone);
      setValue("address", customerItemData.address);
    }
  }, [customerItemData, setValue]);

  if (isLoadingCustomerItem || isEditingCustomer) {
    return <h3>Loading...</h3>;
  }
  return (
    <div>
      <span className="text-2xl">Edit Customer Details</span>
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

export default EditPage;
