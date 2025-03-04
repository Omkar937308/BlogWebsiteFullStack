import React, { useState } from "react";
import emailjs from 'emailjs-com'; // Import EmailJS SDK
import 'animate.css/animate.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Contact.css"; // Custom styles

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    // Handle Input Change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" }); // Clear errors when typing
    };

    // Form Validation
    const validateForm = () => {
        let newErrors = {};
        if (!formData.name) newErrors.name = "Name is required.";
        if (!formData.email) newErrors.email = "Email is required.";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
            newErrors.email = "Email is invalid.";
        if (!formData.message) newErrors.message = "Message cannot be empty.";
        return newErrors;
    };

    // Handle Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            // Send the email using EmailJS
            const templateParams = {
                name: formData.name,
                email: formData.email,
                message: formData.message,
            };

            // Replace with your actual EmailJS Service ID, Template ID, and Public Key (User ID)
            emailjs.send(
                'service_t97f64j',      // Replace with your Service ID
                'template_0wco1un',     // Replace with your Template ID
                templateParams,         // The form data
                'vXo4sXp64cvYxpXJX'       // Replace with your Public Key (User ID)
            )
            .then((response) => {
                console.log('Email sent successfully:', response);
                setSubmitted(true);
                setFormData({ name: "", email: "", message: "" }); // Reset form
            })
            .catch((error) => {
                console.error('Error sending email:', error);
            });
        }
    };

    return (
        <section id="contact-us" className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow-lg p-4 animate__animated animate__fadeIn">
                        <h2 className="text-center text-primary mb-4">Contact Us</h2>
                        {submitted ? (
                            <div className="alert alert-success text-center animate__animated animate__zoomIn">
                                Thank you! Your message has been sent successfully.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                {/* Name Input */}
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>

                                {/* Email Input */}
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>

                                {/* Message Input */}
                                <div className="mb-3">
                                    <label className="form-label">Message</label>
                                    <textarea
                                        name="message"
                                        className={`form-control ${errors.message ? "is-invalid" : ""}`}
                                        rows="5"
                                        placeholder="Write your message here..."
                                        value={formData.message}
                                        onChange={handleChange}
                                    ></textarea>
                                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                                </div>

                                {/* Submit Button */}
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
