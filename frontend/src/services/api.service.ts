import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
  ask: async (question: string) => {
    const response = await axios.post(`${API_BASE_URL}/ask`, { question });
    return response.data;
  },
  uploadDocument: async (doc: { title: string; topic: string; content: string }) => {
    const response = await axios.post(`${API_BASE_URL}/upload`, doc);
    return response.data;
  },
  getHistory: async () => {
    const response = await axios.get(`${API_BASE_URL}/history`);
    return response.data;
  },
  getTrace: async (id: string) => {
    const response = await axios.get(`${API_BASE_URL}/trace/${id}`);
    return response.data;
  }
};
