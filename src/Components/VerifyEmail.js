import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";

const VerifyEmail = ({ setIsLoggedIn }) => {
  const [verificationCode, setVerificationCode] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState(""); // 'success' or 'error'
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage("");
    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/verify-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            code: verificationCode,
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setStatusMessage("Email verified successfully!");
        setStatusType("success");
        localStorage.setItem("token", data.token);
        setTimeout(() => {
          setIsLoggedIn(true);
          navigate("/");
        }, 2000);
      } else {
        setStatusMessage(data.message || "Verification failed. Try again.");
        setStatusType("error");
      }
    } catch (error) {
      setStatusMessage("Something went wrong. Please try again.");
      setStatusType("error");
    } finally {
      setIsLoading(false);
    }
  };

  if (!email) {
    return <div>Invalid verification attempt</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-100 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Verify Your Email
        </h2>
        <p className="text-gray-600 mb-4 text-center">
          Please enter the verification code sent to {email}
        </p>
        {statusMessage && (
          <div
            className={`p-3 rounded-md mb-4 text-center ${
              statusType === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-700"
            }`}
          >
            {statusMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Enter verification code"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-lg bg-sky-500 text-white hover:bg-sky-600 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
