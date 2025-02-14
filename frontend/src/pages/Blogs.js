import React, { useEffect, useState } from "react";
import { getBlogs, createBlog } from "../services/api";
import BlogCard from "../components/BlogCard";
 
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const token = sessionStorage.getItem("token"); // Use sessionStorage instead of localStorage

  useEffect(() => {
    getBlogs().then(setBlogs);
  }, []);

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      setMessage("Title and content are required.");
      return;
    }
  
    try {
      await createBlog({ title, content }, token);
      setMessage("Blog created successfully!");
      setTitle("");
      setContent("");
      getBlogs().then(setBlogs);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to create blog.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Blog Section</h2>

      {token && (
        <div className="mb-5">
          <h3>Add a New Blog</h3>
          {message && <p className="alert alert-info">{message}</p>}
          <form onSubmit={handleCreateBlog}>
            <div className="mb-3">
              <label>Title</label>
              <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label>Content</label>
              <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Create Blog</button>
          </form>
        </div>
      )}

      <h3 className="text-center">All Blogs</h3>
      <div className="row">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div className="col-md-4" key={blog.id}>
              <BlogCard blog={blog} />
            </div>
          ))
        ) : (
          <p className="text-center">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default Blogs;  