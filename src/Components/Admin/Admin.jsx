import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Admin.css";

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [editId, setEditId] = useState(null);
    const [message, setMessage] = useState("");

    const defaultPassword = "aditya@";

    const showToast = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 3000);
    };

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
            const response = await fetch("http://localhost:5001/api/blogs");
            if (!response.ok) throw new Error("Failed to fetch blogs");

            const data = await response.json();
            setBlogs(Array.isArray(data) ? data : []);
        } catch (error) {
            setError(error.message);
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

        const blogData = {
            title,
            content,
            image,
        };

        if (editId) {
            blogData._id = editId;
        }

        try {
            setLoading(true);
            const method = editId ? "PUT" : "POST";
            const url = editId
                ? `http://localhost:5001/api/blogs/${editId}`
                : "http://localhost:5001/api/blogs";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(blogData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to save blog");
            }

            showToast(editId ? "✅ Blog updated!" : "✅ Blog added!");
            setTitle("");
            setContent("");
            setImage(null);
            setEditId(null);
            fetchBlogs();
        } catch (err) {
            alert(err.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setTitle("");
        setContent("");
        setImage(null);
        setEditId(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => setImage(reader.result);
        if (file) reader.readAsDataURL(file);
    };

    const handleEdit = (blog) => {
        setTitle(blog.title);
        setContent(blog.content);
        setImage(blog.image);
        setEditId(blog._id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this blog?");
        if (!confirmed) return;

        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5001/api/blogs/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Failed to delete blog");

            showToast("🗑️ Blog deleted!");
            fetchBlogs();
        } catch (err) {
            alert(err.message || "Error deleting blog");
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login">
                <div className="card p-4 shadow login-card">
                    <h2 className="text-center mb-4">🔐 Admin Login</h2>
                    <div className="form-group">
                        <label htmlFor="passwordInput" className="form-label">
                            Enter Password
                        </label>
                        <div className="input-group">
                            <input
                                id="passwordInput"
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Enter Password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>
                    <button
                        className="btn btn-primary btn-block mt-3 w-100"
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
            <h2>{editId ? "✏️ Edit Blog" : "📝 Add New Blog"}</h2>

            {message && <div className="toast-message">{message}</div>}

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
                />
                <input type="file" accept="image/*" onChange={handleImageChange} />

                <div className="form-actions">
                    <button type="submit" disabled={loading}>
                        {editId ? "Update Blog" : "Add Blog"}
                    </button>
                    {editId && (
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className="cancel-btn"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <div className="blog-list">
                <h3>📚 Blog List</h3>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : blogs.length === 0 ? (
                    <p>No blogs available</p>
                ) : (
                    blogs.map((blog) => (
                        <div className="blog-card fade-in" key={blog._id}>
                            <h4>{blog.title}</h4>
                            <p className="blog-content">{blog.content}</p>
                            {blog.image && (
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="blog-img"
                                    style={{ maxWidth: "100%", borderRadius: "5px" }}
                                />
                            )}
                            <div className="blog-actions">
                                <button onClick={() => handleEdit(blog)}>Edit</button>
                                <button onClick={() => handleDelete(blog._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
