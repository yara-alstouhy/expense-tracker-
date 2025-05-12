import { useState, useEffect } from "react";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseForm from "../components/ExpenseForm";
import CategoryManager from "../components/CategoryManager";
import FilterBar from "../components/FilterBar";
import api from "../services/api";

export default function Dashboard() {
    const [expenses, setExpenses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filters, setFilters] = useState({ month: "", year: "", category: "", date: "" });
    const [showForm, setShowForm] = useState(false);
    const [showCategoryPopup, setShowCategoryPopup] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(null);

    useEffect(() => {
        fetchExpenses();
        fetchCategories();
    }, [filters]);

    const fetchExpenses = async () => {
        const params = { ...filters };
        const response = await api.get("expenses/api_expenses/expense/", { params });
        setExpenses(response.data);

    };

    const fetchCategories = async () => {
        const res = await api.get("expenses/api_expenses/category/");
        setCategories(res.data);

    };

    const handleEdit = (expense) => {
        setSelectedExpense(expense);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        await api.delete(`expenses/api_expenses/expense/${id}/`);
        fetchExpenses();
    };

    return (
        <div className="p-6 space-y-6 bg-gradient-to-br from-blue-100 via-pink-100 to-yellow-100 h-screen">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Monthly Expenses</h1>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => {
                        setSelectedExpense(null);
                        setShowForm(true);
                    }}
                >
                    + Add Expense
                </button>
            </div>

            <FilterBar filters={filters} setFilters={setFilters} categories={categories} />

            <ExpenseTable
                expenses={expenses}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

            {showForm && (
                <ExpenseForm
                    categories={categories}
                    expense={selectedExpense}
                    onClose={() => setShowForm(false)}
                    onSave={() => {
                        fetchExpenses();
                        setShowForm(false);
                    }}
                    openCategoryPopup={() => setShowCategoryPopup(true)}
                />
            )}

            {showCategoryPopup && (
                <CategoryManager
                    categories={categories}
                    onClose={() => {
                        setShowCategoryPopup(false);
                        fetchCategories();
                    }}
                />
            )}
        </div>
    );
}
