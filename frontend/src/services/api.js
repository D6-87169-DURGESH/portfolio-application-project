import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Ensure this is correct

// ========== Authentication APIs ==========
export const registerUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data;
  } catch (error) {
    console.error("❌ Registration failed:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, data,);
    return response.data;
  } catch (error) {
    console.error("❌ Login failed:", error.response?.data || error.message);
    throw error;
  }
};

// ========== Project APIs ==========
export const getProjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching projects:", error.response?.data || error.message);
    throw error;
  }
};

export const createProject = async (projectData, token) => {
  if (!token) {
    console.error("❌ Missing authentication token");
    throw new Error("Authentication required");
  }

  try {
    const response = await axios.post(`${API_URL}/projects`, projectData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error creating project:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteProject = async (projectId, token) => {
  if (!token) {
    console.error("❌ Missing authentication token");
    throw new Error("Authentication required");
  }

  try {
    await axios.delete(`${API_URL}/projects/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("❌ Error deleting project:", error.response?.data || error.message);
    throw error;
  }
};

// ========== Testimonial APIs ==========
export const getTestimonials = async () => {
  try {
    const response = await axios.get(`${API_URL}/testimonials`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching testimonials:", error.response?.data || error.message);
    throw error;
  }
};

export const createTestimonial = async (testimonialData, token) => {
  if (!token) {
    console.error("❌ Missing token for authentication");
    throw new Error("Authentication required");
  }

  try {
    const response = await axios.post(`${API_URL}/testimonials`, testimonialData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error creating testimonial:", error.response?.data || error.message);
    throw error;
  }
};

// ========== Contact Form APIs ==========
export const submitContact = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/contact`, data);
    return response.data;
  } catch (error) {
    console.error("❌ Contact submission failed:", error.response?.data || error.message);
    throw error;
  }
};

export const getContacts = async (token) => {
  if (!token) {
    console.error("❌ Missing authentication token");
    throw new Error("Authentication required");
  }

  try {
    const response = await axios.get(`${API_URL}/contact`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching contacts:", error.response?.data || error.message);
    throw error;
  }
};

// ========== Blog APIs ==========
export const getBlogs = async () => {
  try {
    const response = await axios.get(`${API_URL}/blogs`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching blogs:", error.response?.data || error.message);
    throw error;
  }
};

export const createBlog = async (blogData, token) => {
  if (!token) {
    console.error("❌ Missing authentication token");
    throw new Error("Authentication required");
  }

  try {
    const response = await axios.post(`${API_URL}/blogs`, blogData, {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("❌ Blog creation failed:", error.response?.data || error.message);
    throw error;
  }
};

// ========== Settings APIs (Dark Mode & SEO) ==========
export const getSettings = async () => {
  try {
    const response = await axios.get(`${API_URL}/settings`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching settings:", error.response?.data || error.message);
    throw error;
  }
};

export const updateSettings = async (settingsData, token) => {
  if (!token) {
    console.error("❌ No token provided for authentication");
    throw new Error("Authentication required");
  }

  try {
    const response = await axios.put(`${API_URL}/settings`, settingsData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Settings updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating settings:", error.response?.data || error.message);
    throw error;
  }
};
