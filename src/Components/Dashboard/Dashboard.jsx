import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReactPaginate from "react-paginate";
import { Home, User, Settings, LogOut, Menu } from "lucide-react";
import "./Dashboard.css";
import Notification from "../Notify/Notify";



// Dummy product data (replace with API fetch)
const productsData = [
  { id: 1, name: "Laptop", category: "Electronics", price: 800 },
  { id: 2, name: "Phone", category: "Electronics", price: 500 },
  { id: 3, name: "Shoes", category: "Fashion", price: 120 },
  { id: 4, name: "Watch", category: "Accessories", price: 250 },
  { id: 5, name: "Tablet", category: "Electronics", price: 300 },
  { id: 6, name: "Backpack", category: "Fashion", price: 70 },
  { id: 7, name: "Headphones", category: "Electronics", price: 150 },
  { id: 8, name: "Sunglasses", category: "Accessories", price: 100 },
];

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);
  const [isMenuOpen, setIsMenuOpen] = useState(!isMobile);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const [showNotification, setShowNotification] = useState(true); 
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  // Toggle menu for small screens
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
// Close the notification
const closeNotification = () => {
  setShowNotification(false);
};

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      setIsMenuOpen(window.innerWidth > 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filtering & Sorting logic
  const filteredProducts = productsData
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product) => (categoryFilter ? product.category === categoryFilter : true))
    .sort((a, b) => (sortOrder === "asc" ? a.price - b.price : b.price - a.price));

  // Pagination logic
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  const displayedProducts = filteredProducts.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="dashboard-container">
      {showNotification && (
        <Notification message="Buy our products now!" onClose={closeNotification} />
      )}
      {/* Sidebar */}
      <motion.div
        className={`sidebar ${isMenuOpen ? "open" : "closed"}`}
        initial={{ x: isMobile ? -250 : 0 }}
        animate={{ x: isMenuOpen ? 0 : isMobile ? -250 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="sidebar-header">
          <h2>Dashboard</h2>
          {isMobile && (
            <button onClick={toggleMenu} className="menu-close">
              ✖
            </button>
          )}
        </div>
        <ul className="sidebar-menu">
          <li className="sidebar-item">
            <Home size={20} className="icon" /> Home
          </li>
          <li className="sidebar-item" onClick={() => navigate("/profile")}>
  <User size={20} className="icon" /> Profile
</li>

          <li className="sidebar-item" onClick={() => navigate("/settings")}>
            <Settings size={20} className="icon" /> Settings
          </li>
          <li className="sidebar-item logout" onClick={handleLogout}>
            <LogOut size={20} className="icon" /> Logout
          </li>
        </ul>
      </motion.div>

      {/* Main Content */}
      <div className={`main-content ${isMenuOpen ? "shifted" : ""}`}>
        {isMobile && (
          <button onClick={toggleMenu} className="menu-btn">
            <Menu size={24} /> Menu
          </button>
        )}

        <motion.div
          className="content-card"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Products</h1>

          {/* Search & Filters */}
          <div className="filters">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Accessories">Accessories</option>
            </select>

            <select onChange={(e) => setSortOrder(e.target.value)}>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>
          </div>

          {/* Product List */}
          <div className="product-list">
            {displayedProducts.map((product) => (
              <div key={product.id} className="product-card">
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <ReactPaginate
            previousLabel={"← Previous"}
            nextLabel={"Next →"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
