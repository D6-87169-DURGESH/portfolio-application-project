import axios from "axios";

const API_URL = "http://localhost:5000/api";

// ========== Authentication APIs ==========
export const registerUser = async (data) => {
  return await axios.post(`${API_URL}/auth/register`, data);
};

export const loginUser = async (data) => {
  return await axios.post(`${API_URL}/auth/login`, data);
};

// ========== Project APIs ==========
export const getProjects = async () => {
  const response = await axios.get(`${API_URL}/projects`);
  return response.data;
};

export const createProject = async (projectData, token) => {
  return await axios.post(`${API_URL}/projects`, projectData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteProject = async (projectId, token) => {
  return await axios.delete(`${API_URL}/projects/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ========== Testimonial APIs ==========
export const getTestimonials = async () => {
  const response = await axios.get(`${API_URL}/testimonials`);
  return response.data;
};

export const createTestimonial = async (testimonialData, token) => {
  return await axios.post(`${API_URL}/testimonials`, testimonialData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ========== Contact Form APIs ==========
export const submitContact = async (data) => {
  return await axios.post(`${API_URL}/contact`, data);
};

export const getContacts = async (token) => {
  return await axios.get(`${API_URL}/contact`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ========== Blog APIs ==========
export const getBlogs = async () => {
  const response = await axios.get(`${API_URL}/blogs`);
  return response.data;
};

export const createBlog = async (blogData, token) => {
  return await axios.post(`${API_URL}/blogs`, blogData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ========== Settings APIs (Dark Mode & SEO) ==========
export const getSettings = async () => {
  const response = await axios.get(`${API_URL}/settings`);
  return response.data;
};

export const updateSettings = async (settingsData, token) => {
  return await axios.post(`${API_URL}/settings`, settingsData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
