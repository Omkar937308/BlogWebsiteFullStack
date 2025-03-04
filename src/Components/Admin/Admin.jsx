import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Admin.css";

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editId, setEditId] = useState(null);

    const defaultPassword = "aditya@";

    const handleLogin = () => {
        if (passwordInput === defaultPassword) {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password. Please try again.");
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchBlogs();
        }
    }, [isAuthenticated]);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch('http://localhost:5001/api/blogs');
            if (!response.ok) {
                throw new Error('Failed to fetch blogs');
            }
            const data = await response.json();
            setBlogs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setError(error.message);
            setBlogs([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !content) {
            alert("Title and content are required!");
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await fetch('http://localhost:5001/api/blogs', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    content,
                    image: image || null
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save blog');
            }

            const data = await response.json();
            await fetchBlogs();
            setTitle("");
            setContent("");
            setImage(null);
            alert('Blog saved successfully!');
        } catch (error) {
            console.error('Error saving blog:', error);
            alert(error.message || 'Error saving blog. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleEdit = async (blog) => {
        try {
            setTitle(blog.title);
            setContent(blog.content);
            setImage(blog.image);
            setEditId(blog._id);
        } catch (error) {
            console.error('Error setting up edit:', error);
            alert('Error preparing blog for edit. Please try again.');
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5001/api/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to delete blog');
            }

            await fetchBlogs();
            alert('Blog deleted successfully!');
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert(error.message || 'Error deleting blog. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login d-flex justify-content-center align-items-center">
                <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
                    <h2 className="text-center mb-4">Admin Login</h2>
                    <div className="form-group">
                        <label htmlFor="passwordInput" className="form-label">
                            Enter Only Password
                        </label>
                        <br />
                        <input
                            id="passwordInput"
                            type="password"
                            className="form-control"
                            placeholder="Enter Password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                        />
                    </div>
                    <button
                        className="btn btn-primary btn-block mt-3"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-panel">
            <h2>Blogs</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Blog Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Blog Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <button type="submit" disabled={loading}>
                    {editId ? "Update Blog" : "Add Blog"}
                </button>
            </form>

            <div className="blog-list">
                <h3>Blog List</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : blogs.length === 0 ? (
                    <p>No blogs available</p>
                ) : (
                    blogs.map((blog) => (
                        <div className="blog-card" key={blog._id}>
                            <h4>{blog.title}</h4>
                            <p className="blog-content">{blog.content}</p>
                            {blog.image && (
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    style={{ width: "100%", height: "auto", marginTop: "10px" }}
                                />
                            )}
                            <div className="blog-actions"><br />
                                <button onClick={() => handleEdit(blog)} disabled={loading}>Edit</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                <button onClick={() => handleDelete(blog._id)} disabled={loading}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
