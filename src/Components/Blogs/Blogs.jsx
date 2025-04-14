import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Blogs.css";

export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, []);

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

    if (loading) {
        return (
            <div className="blogs">
                <h2>Blogs</h2>
                <p>Loading blogs...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="blogs">
                <h2>Blogs</h2>
                <p className="error">Error: {error}</p>
                <button onClick={fetchBlogs}>Try Again</button>
            </div>
        );
    }

    return (
        <div className="blogs">
            <h2>Blogs</h2>
            {blogs.length === 0 ? (
                <p>No blogs available. Add some from the admin panel!</p>
            ) : (
                <div className="blogs-list">
                    {blogs.map((blog) => (
                        <div className="blog-card" key={blog._id}>
                            <Link to={`/Blogs/${blog._id}`}>
                                <h3 className="blog-title">{blog.title}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
