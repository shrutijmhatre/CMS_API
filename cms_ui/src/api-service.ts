import { EditFormData } from "./pages/EditPage";
import { LoginForm } from "./pages/Login";
import { SubmitFormData } from "./pages/NewPage";
import { SignUpForm } from "./pages/SignUp";
import { CustomerType } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";


export const fetchCustomerList = async (): Promise<CustomerType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/Customers`);
  
    if (!response.ok) {
      throw new Error("Error fetching customers");
    }
  
    return response.json();
};

export const deleteCustomer = async (id:string) => {
    const response = await fetch(`${API_BASE_URL}/api/customers/${id}`, {
      method: 'DELETE'
    });
  
    if (!response.ok) {
      throw new Error("Error deleting customers");
    }
  
    return response.json();
};

export const addCustomer = async (payload: SubmitFormData ) => {
    const response = await fetch(`${API_BASE_URL}/api/customers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify(payload),
      });
    
      const body = await response.json();
      if (!response.ok) {
        throw new Error("Error adding new customer");
      }
      return body;
};

export const fetchCustomerById = async (id:string): Promise<CustomerType> => {
  const response = await fetch(`${API_BASE_URL}/api/customers/${id}`);

  if (!response.ok) {
    throw new Error("Error fetching customer by Id");
  }

  return response.json();
};

export const updateCustomerById = async (payload: EditFormData, id:string) => {
  
  const response = await fetch(`${API_BASE_URL}/api/customers/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;

};

export const registerUser = async (payload: SignUpForm ) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify(payload),
    });
  
    const body = await response.json();
    if (!response.ok) {
      throw new Error("Error adding new customer");
    }
    return body;
};

export const loginUser = async (payload: LoginForm ) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify(payload),
    });
  
    const body = await response.json();
    if (!response.ok) {
      throw new Error("Error during login");
    }
    return body;
};