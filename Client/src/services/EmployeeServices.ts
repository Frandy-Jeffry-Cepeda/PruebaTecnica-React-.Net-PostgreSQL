import { getToken } from '../utils/auth'
import { DataEmployee, UserSchema } from '../types';

import axios from 'axios'

export async function EmployeeGetInfo() {
    try {
        const token = getToken();

        const url = `http://localhost:5057/api/User/Get-Employee`;
    
        const response = await axios(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

       return response.data

    
    } catch (error) {
       console.log(error)
    }
}

export async function EmployeeGetInfoForUpdate() {
  try {
      const token = getToken();
      const url = `http://localhost:5057/api/User/Get-Employee-Data-ForUpdate`;
  
      const response = await axios(url, {
          headers: {
              Authorization: `Bearer ${token}`,
          },
      });

     return response.data

  
  } catch (error) {
     console.log(error)
  }
}

export async function EmployeeUpdateInfo(id: UserSchema["id"], updatedData: DataEmployee) {
  try {
    const token = getToken();
    const url = `http://localhost:5057/api/User/Update-Employee/${id}`;

    const response = await axios.put(url, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });

    return response.data;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log("Error Response:", error.response?.data || error.message);
    }
    throw error;
  }
}
