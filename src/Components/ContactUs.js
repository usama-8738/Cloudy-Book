import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({ success: false, message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      // Simulate a successful form submission (replace this with API integration)
      setFormStatus({
        success: true,
        message: "Thank you for reaching out! We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } else {
      setFormStatus({
        success: false,
        message: "Please fill out all fields before submitting.",
      });
    }
    setTimeout(() => {
      setFormStatus({ success: false, message: "" });
    }, 3000);
  };

  return (
    <div className="bg-gradient-to-b from-purple-50 to-purple-100 py-12">
      <div className="max-w-5xl mx-auto px-6 sm:px-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 text-center mb-8">
          Contact <span className="text-purple-500">Us</span>
        </h1>
        <p className="text-gray-600 text-lg text-center mb-12">
          Got a question or feedback? We'd love to hear from you! Please fill
          out the form below, and we'll get back to you as soon as possible.
        </p>

        {formStatus.message && (
          <div
            className={`mb-8 text-center p-4 rounded-lg ${
              formStatus.success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {formStatus.message}
          </div>
        )}

        <form
          className="bg-cloudybook-grey border-white border-2 shadow-md rounded-lg p-8 max-w-lg mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="bg-cloudybook-grey input input-bordered w-full mt-1"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-cloudybook-grey input input-bordered w-full mt-1"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="textarea textarea-bordered w-full mt-1"
              rows="5"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 transition-all"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
