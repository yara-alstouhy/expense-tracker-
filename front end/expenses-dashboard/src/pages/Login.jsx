import { useState } from "react";
import api from "../services/api.js";  // import your axios instance
import { useNavigate } from "react-router-dom"; // if using react-router-dom for navigation

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const fetchCSRFToken = async () => {
        const response = await api.get('/accounts/api_account/get-csrf-token/');
        return response.data.csrfToken;
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // Fetch CSRF Token first
            const csrfToken = await fetchCSRFToken();

            // Include CSRF token in the request headers
            const response = await api.post('/accounts/api_account/login/', {
                username,
                password,
            }, {
                headers: {
                    'X-CSRFToken': csrfToken  // Attach CSRF Token
                }
            });

            console.log(response);

            // Save tokens to localStorage
            localStorage.setItem("token", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);

            // Redirect user to the dashboard
            navigate("/dashboard");

        } catch (err) {
            setError("Invalid username or password.");
            console.error(err);
        }
    }; // adjust route as needed


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
                <h2 className="text-3xl font-bold text-center mb-6 text-gray-700">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/register")} // Redirect to register page
                        className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition "
                    >
                        Register
                    </button>

                </form>
            </div>
        </div>
    );
}
