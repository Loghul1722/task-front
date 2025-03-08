import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./Product.css";

const Products = () => {
  const allProducts = [
    { id: 1, name: "Laptop", price: 999, category: "Electronics", image: "https://via.placeholder.com/150" },
    { id: 2, name: "Smartphone", price: 699, category: "Electronics", image: "https://via.placeholder.com/150" },
    { id: 3, name: "Headphones", price: 199, category: "Accessories", image: "https://via.placeholder.com/150" },
    { id: 4, name: "Smartwatch", price: 299, category: "Accessories", image: "https://via.placeholder.com/150" },
    { id: 5, name: "Tablet", price: 499, category: "Electronics", image: "https://via.placeholder.com/150" },
    { id: 6, name: "Keyboard", price: 89, category: "Accessories", image: "https://via.placeholder.com/150" },
    { id: 7, name: "Monitor", price: 329, category: "Electronics", image: "https://via.placeholder.com/150" },
    { id: 8, name: "Mouse", price: 49, category: "Accessories", image: "https://via.placeholder.com/150" },
    { id: 9, name: "Speaker", price: 149, category: "Audio", image: "https://via.placeholder.com/150" },
    { id: 10, name: "Microphone", price: 129, category: "Audio", image: "https://via.placeholder.com/150" },
  ];

  // State
  const [products, setProducts] = useState(allProducts);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 4;

  // Filter, Search & Sort Logic
  useEffect(() => {
    let filteredProducts = allProducts;

    // Search Filtering
    if (search) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category Filtering
    if (category !== "All") {
      filteredProducts = filteredProducts.filter((product) => product.category === category);
    }

    // Sorting
    filteredProducts.sort((a, b) =>
      sortOrder === "asc" ? a.price - b.price : b.price - a.price
    );

    setProducts(filteredProducts);
    setCurrentPage(0); // Reset to first page on filter change
  }, [search, category, sortOrder]);

  // Pagination Logic
  const offset = currentPage * productsPerPage;
  const paginatedProducts = products.slice(offset, offset + productsPerPage);

  return (
    <div className="products-container">
      <h1>Products</h1>

      {/* Search & Filter Bar */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Accessories">Accessories</option>
          <option value="Audio">Audio</option>
        </select>

        <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          Sort Price: {sortOrder === "asc" ? "⬆️" : "⬇️"}
        </button>
      </div>

      {/* Product List */}
      <div className="products-list">
        {paginatedProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <p className="category">{product.category}</p>
            <button className="buy-btn">Buy Now</button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <ReactPaginate
        previousLabel={"← Prev"}
        nextLabel={"Next →"}
        pageCount={Math.ceil(products.length / productsPerPage)}
        onPageChange={(data) => setCurrentPage(data.selected)}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Products;
