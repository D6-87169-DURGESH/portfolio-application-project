import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
};

export const getTestimonials = async () => {
  const response = await axios.get(`${API_URL}/testimonials`);
  return response.data;
};

export const submitContact = async (contactData) => {
  const response = await axios.post(`${API_URL}/contact`, contactData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/auth/login`, credentials);
  return response.data;
};
