import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogDetail.css";

export default function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlog();
    }, [id]);

    const fetchBlog = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetch(`http://localhost:5001/api/blogs/${id}`);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Blog not found');
                }
                throw new Error('Failed to fetch blog');
            }

            const data = await response.json();
            setBlog(data);
        } catch (error) {
            console.error('Error fetching blog:', error);
            setError(error.message);
            setBlog(null);
        } finally {
            setLoading(false);
        }
    };
//if the blog loging
    if (loading) {
        return (
            <div className="blog-detail">
                <h2>Loading...</h2>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="blog-detail">
                <p>
                    {error || "Blog not found"}. Return to the{" "}
                    <span onClick={() => navigate("/Blogs")} className="link">
                        Blogs
                    </span>
                </p>
            </div>
        );
    }

    return (
        <div className="blog-detail">
            <button className="back-button" onClick={() => navigate("/Blogs")}>
                Back to Blogs
            </button>
            <article>
                <h2>{blog.title}</h2>
                {/* <div className="blog-meta">
                    {blog.createdAt && (
                        <p className="blog-date">
                            Posted on: {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                    )}
                </div> */}
                <div className="blog-content">
                    <p>{blog.content}</p>
                    {blog.image && (
                        <div className="blog-image">
                            <img src={blog.image} alt={blog.title} />
                        </div>
                    )}
                </div>
                <div className="blog-meta">
                    {blog.createdAt && (
                        <p className="blog-date">
                            Posted on: {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                    )}
                </div>
            </article>
        </div>
    );
};
