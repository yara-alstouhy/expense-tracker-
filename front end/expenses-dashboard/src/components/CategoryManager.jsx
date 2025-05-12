import { useEffect, useState } from "react";
import api from "../services/api";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

export default function CategoryManager({ onClose, onCategoryUpdated }) {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingName, setEditingName] = useState("");

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        const res = await api.get("/expenses/api_expenses/category/");
        setCategories(res.data);
    };

    const handleAdd = async () => {
        if (!newCategory.trim()) return;
        await api.post("/expenses/api_expenses/category/", { name: newCategory });
        setNewCategory("");
        fetchCategories();
        onCategoryUpdated(); // notify parent
    };

    const handleDelete = async (id) => {
        await api.delete(`/expenses/api_expenses/category/${id}/`);
        fetchCategories();
        onCategoryUpdated();
    };

    const handleEdit = (id, name) => {
        setEditingId(id);
        setEditingName(name);
    };

    const handleSaveEdit = async () => {
        await api.put(`/expenses/api_expenses/category/${editingId}/`, { name: editingName });
        setEditingId(null);
        setEditingName("");
        fetchCategories();
        onCategoryUpdated();
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 flex items-center justify-center z-50">
            <div className="bg-white p-6 w-full max-w-md rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Manage Categories</h2>

                {/* Add New Category */}
                <div className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="New category name"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="flex-1 border rounded px-3 py-2"
                    />
                    <button
                        onClick={handleAdd}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Add
                    </button>
                </div>

                {/* Existing Categories */}
                <ul className="space-y-2 max-h-64 overflow-y-auto">
                    {categories.map((cat) => (
                        <li key={cat.id} className="flex justify-between items-center">
                            {editingId === cat.id ? (
                                <input
                                    type="text"
                                    value={editingName}
                                    onChange={(e) => setEditingName(e.target.value)}
                                    className="border rounded px-2 py-1 flex-1 mr-2"
                                />
                            ) : (
                                <span>{cat.name}</span>
                            )}
                            <div className="flex gap-2">
                                {editingId === cat.id ? (
                                    <button
                                        onClick={handleSaveEdit}
                                        className="text-blue-500 hover:text-blue-700"
                                        title="Save"
                                    >
                                        <FaSave />
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => handleEdit(cat.id, cat.name)}
                                        className="text-yellow-500 hover:text-yellow-700"
                                        title="Edit"
                                    >
                                        <FaEdit />
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(cat.id)}
                                    className="text-red-500 hover:text-red-700"
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>

                {/* Close Button */}
                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
