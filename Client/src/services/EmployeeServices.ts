import axios from 'axios'
import { getToken } from '../utils/auth'
import { userSchema } from '../schemas';
import { UpdateFormDataSchema, UserSchema } from '../types';

export async function EmployeeGetInfo() {
    try {
        const token = getToken();
        const url = "http://localhost:5057/api/User/Get-Employee";
    
        const response = await axios(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    
        const result = userSchema.safeParse(response.data);
    
        if (result.success) {
            return result.data;
        } 
    
    } catch (error) {
       console.log(error)
    }
}

export async function EmployeeUpdateInfo(updatedData: UpdateFormDataSchema) {
    try {

      const token = getToken()
  
      const url = `http://localhost:5057/api/User/Update-Employee`;
  
      const response = await axios.put(url, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
  
      return response.data;

    } catch (error) {
      console.log(error)
    }
  }