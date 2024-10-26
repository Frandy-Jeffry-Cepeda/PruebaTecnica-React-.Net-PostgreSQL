import axios from 'axios'
import { getToken } from '../utils/auth'
import { userSchema } from '../schemas';

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