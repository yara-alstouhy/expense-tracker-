import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddExpensePage from "./pages/AddExpensePage";  // For Add/Edit Expense
import CategoryManagerPage from "./pages/CategoryManagerPage";
function App() {
    const isAuthenticated = !!localStorage.getItem("token");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Dashboard */}
                <Route path="/dashboard" element={<Dashboard />} />

                {/* Add/Edit Expense */}
                <Route path="/expense/add" element={<AddExpensePage />} />
                <Route path="/expense/edit/:id" element={<AddExpensePage />} /> {/* Edit Expense route */}

                {/* Category Manager */}
                <Route path="/categories" element={<CategoryManagerPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
