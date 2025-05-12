import { useState, useEffect } from "react";
import CategoryManager from "../components/CategoryManager"; // Modal to manage categories

export default function CategoryManagerPage() {
    const [showModal, setShowModal] = useState(false);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Category Manager</h1>
            <button
                onClick={() => setShowModal(true)}
                className="bg-green-500 text-white py-2 px-4 rounded"
            >
                Manage Categories
            </button>

            {/* Show modal when 'Manage Categories' is clicked */}
            {showModal && (
                <CategoryManager
                    onClose={() => setShowModal(false)}
                    onCategoryUpdated={() => setShowModal(false)} // Close modal after update
                />
            )}
        </div>
    );
}
