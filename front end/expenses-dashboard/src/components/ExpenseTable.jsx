import { FaEdit, FaTrash } from "react-icons/fa";

export default function ExpenseTable({ expenses, onEdit, onDelete }) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
                <thead>
                <tr className="bg-gray-100 text-left">
                    <th className="p-3 border-b">Date</th>
                    <th className="p-3 border-b">Description</th>
                    <th className="p-3 border-b">Category</th>
                    <th className="p-3 border-b">Amount</th>
                    <th className="p-3 border-b text-center">Actions</th>
                </tr>
                </thead>
                <tbody>
                {expenses.length === 0 ? (
                    <tr>
                        <td colSpan="5" className="text-center py-6 text-gray-500">
                            No expenses found.
                        </td>
                    </tr>
                ) : (
                    expenses.map((expense) => (
                        <tr key={expense.id} className="hover:bg-gray-50">
                            <td className="p-3 border-b">{expense.date}</td>
                            <td className="p-3 border-b">{expense.description}</td>
                            <td className="p-3 border-b">{expense.category_name || expense.category?.name}</td>
                            <td className="p-3 border-b">${expense.amount}</td>
                            <td className="p-3 border-b text-center space-x-4">
                                <button
                                    onClick={() => onEdit(expense)}
                                    className="text-blue-500 hover:text-blue-700"
                                    title="Edit"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => onDelete(expense.id)}
                                    className="text-red-500 hover:text-red-700"
                                    title="Delete"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}
