import React from "react";
import { NavLink } from "react-router";

const About = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-blue-100 py-12">
      <div className="max-w-6xl mx-auto px-6 sm:px-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-6">
          About <span className="text-blue-500">CloudyNotes</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed mb-8">
          Welcome to <strong>CloudyNotes</strong>, your secure and reliable
          companion for storing and managing notes in the cloud. Whether you're
          capturing ideas, organizing tasks, or keeping track of important
          information, CloudyNotes is designed to help you stay productive,
          anytime, anywhere.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 bg-cloudybook-grey rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 10h11M9 21V3m9 7h3m-3 4h2m-6 4h3m-3-8h6"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Effortless Organization
            </h3>
            <p className="text-gray-600">
              Keep your notes organized with tags, categories, and seamless
              search capabilities.
            </p>
          </div>
          <div className="p-6 bg-cloudybook-grey rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 16h-1v-4h1m0 4h1m-1-4V9m-3 2a1 1 0 000-2m6 6a1 1 0 000-2m2 4H8a2 2 0 01-2-2V8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Secure Cloud Storage
            </h3>
            <p className="text-gray-600">
              Your notes are stored securely in the cloud, accessible only to
              you from any device.
            </p>
          </div>
          <div className="p-6 bg-cloudybook-grey rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-blue-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 9V7a4 4 0 00-4-4H5a4 4 0 00-4 4v10a4 4 0 004 4h8a4 4 0 004-4v-2m0-4h1m0 0h1m-2 0v1m0-1V9m0 0h1"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              User-Friendly Interface
            </h3>
            <p className="text-gray-600">
              A clean and intuitive interface designed for efficiency and ease
              of use.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <button className="px-6 py-3 bg-sky-500 text-white font-semibold rounded-lg shadow-md hover:bg-sky-600 transition-all">
            <NavLink to="/">Get Started</NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
