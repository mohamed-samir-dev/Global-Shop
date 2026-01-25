import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backend-for-global-shop-production.up.railway.app/api';

export const contactService = {
  sendMessage: async (data: { name: string; email: string; subject: string; message: string }) => {
    const response = await axios.post(`${API_URL}/contact`, data);
    return response.data;
  }
};
