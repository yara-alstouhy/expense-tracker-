import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api"; // Axios instance

export default function AddExpensePage() {
    const { id } = useParams(); // If id exists, it's an edit mode
    const navigate = useNavigate();
    const [expense, setExpense] = useState({
        date: "",
        amount: "",
        description: "",
        category: "",
    });

    const [categories, setCategories] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await api.get("/api/categories/");
            setCategories(res.data);
        };

        if (id) {
            setIsEditMode(true);
            const fetchExpense = async () => {
                const res = await api.get(`/api/expenses/${id}/`);
                setExpense(res.data);
            };
            fetchExpense();
        }

        fetchCategories();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditMode) {
                await api.put(`/api/expenses/${id}/`, expense);
            } else {
                await api.post("/api/expenses/", expense);
            }
            navigate("/");
        } catch (error) {
            console.error("Error adding/editing expense:", error);
        }
    };

    return (
        <div className="p-4 bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100">
            <h1 className="text-2xl font-bold mb-4">{isEditMode ? "Edit Expense" : "Add New Expense"}</h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="date"
                    value={expense.date}
                    onChange={(e) => setExpense({ ...expense, date: e.target.value })}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="number"
                    placeholder="Amount"
                    value={expense.amount}
                    onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
                    className="w-full p-2 border rounded"
                />
                <textarea
                    placeholder="Description"
                    value={expense.description}
                    onChange={(e) => setExpense({ ...expense, description: e.target.value })}
                    className="w-full p-2 border rounded"
                />
                <select
                    value={expense.category}
                    onChange={(e) => setExpense({ ...expense, category: e.target.value })}
                    className="w-full p-2 border rounded"
                >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
                >
                    {isEditMode ? "Save Changes" : "Add Expense"}
                </button>
            </form>
        </div>
    );
}
