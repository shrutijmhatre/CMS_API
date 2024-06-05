import { CustomerType } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";


export const fetchCustomerList = async (): Promise<CustomerType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/Customers`);
  
    if (!response.ok) {
      throw new Error("Error fetching customers");
    }
  
    return response.json();
};