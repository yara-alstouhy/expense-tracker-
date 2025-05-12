import { useState, useEffect } from "react";

export default function FilterBar({ filters, setFilters, categories }) {
    const [months] = useState([
        { value: "", label: "All Months" },
        { value: "1", label: "January" },
        { value: "2", label: "February" },
        { value: "3", label: "March" },
        { value: "4", label: "April" },
        { value: "5", label: "May" },
        { value: "6", label: "June" },
        { value: "7", label: "July" },
        { value: "8", label: "August" },
        { value: "9", label: "September" },
        { value: "10", label: "October" },
        { value: "11", label: "November" },
        { value: "12", label: "December" },
    ]);

    const [years, setYears] = useState([]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const yearRange = Array.from({ length: 10 }, (_, i) => currentYear - i);
        setYears([{ value: "", label: "All Years" }, ...yearRange.map((y) => ({ value: y, label: y }))]);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-4 rounded shadow">
            {/* Month Filter */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Month</label>
                <select
                    name="month"
                    value={filters.month}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded px-3 py-2"
                >
                    {months.map((m) => (
                        <option key={m.value} value={m.value}>
                            {m.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Year Filter */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Year</label>
                <select
                    name="year"
                    value={filters.year}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded px-3 py-2"
                >
                    {years.map((y) => (
                        <option key={y.value} value={y.value}>
                            {y.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Category Filter */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    name="category"
                    value={filters.category}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded px-3 py-2"
                >
                    <option value="">All Categories</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Specific Date Filter */}
            <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                    type="date"
                    name="date"
                    value={filters.date}
                    onChange={handleChange}
                    className="w-full mt-1 border rounded px-3 py-2"
                />
            </div>
        </div>
    );
}
