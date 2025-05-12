import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
    const [formData, setFormData] = useState({
        full_name: "",
        username: "",
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");

        try {
            // Fetch CSRF token before POST request
            await api.get('/accounts/api_account/get-csrf-token/');

            const response = await api.post('/accounts/api_account/register/', formData);

            // Save JWT token to localStorage
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);
            }

            setSuccessMessage("Registration successful!");
            navigate("/dashboard");
        } catch (error) {
            const errMsg = error.response?.data?.error || "Registration failed.";
            setErrorMessage(errMsg);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

                {successMessage && <div className="bg-green-500 text-white p-2 rounded mb-4">{successMessage}</div>}
                {errorMessage && <div className="bg-red-500 text-white p-2 rounded mb-4">{errorMessage}</div>}

                <form onSubmit={handleRegister}>
                    {["full_name", "username", "email", "password"].map((field) => (
                        <div key={field} className="mb-4">
                            <label className="block mb-1 text-gray-700 capitalize">{field.replace("_", " ")}</label>
                            <input
                                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </div>
                    ))}
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
