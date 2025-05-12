import { useState } from "react";
import api  from "../services/api.js";

export default function Register() {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // To handle error messages
    const [successMessage, setSuccessMessage] = useState(""); // To handle success messages
    const fetchCSRFToken = async () => {
        const response = await api.get('/accounts/api_account/get-csrf-token/');
        return response.data.csrfToken;
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        const csrfToken = await fetchCSRFToken();
        try {
            // Send the register request to Django API
            const response = await api.post('/accounts/api_account/register/', {
                full_name: fullName,
                username: username,
                email: email,
                password: password,
            }, {
                headers: {
                    'X-CSRFToken': csrfToken  // Attach CSRF Token
                }
            });

            // If registration is successful, handle the success response
            setSuccessMessage("Registration successful!");
            setErrorMessage(""); // Clear any previous error messages
            // Save tokens to localStorage
            localStorage.setItem("token", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);

            // Redirect user to the dashboard
            navigate("/dashboard");
        } catch (error) {
            // If an error occurs (like validation failure), handle the error response
            if (error.response) {
                // If the error comes from the backend
                setErrorMessage(error.response.data.error || "An error occurred during registration.");
            } else {
                // If there's an issue with the request (e.g., network error)
                setErrorMessage("Network error. Please try again later.");
            }
            setSuccessMessage(""); // Clear any success messages
            console.error("Registration failed:", error);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

                {/* Display success or error message */}
                {successMessage && (
                    <div className="bg-green-500 text-white p-2 rounded mb-4">{successMessage}</div>
                )}
                {errorMessage && (
                    <div className="bg-red-500 text-white p-2 rounded mb-4">{errorMessage}</div>
                )}

                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-700">Full Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-700">Username</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-1 text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full p-2 border rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-1 text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full p-2 border rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
