import { useState } from "react";
import Products from "../components/Products";

function Shop({ addToCart, addToWishlist, wishlist, setSelectedProduct, setSelectedPage }) {
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState("default");

  return (
    <div className="bg-black text-white min-h-screen pt-32 px-6">
      <h1 className="text-3xl text-center mb-10 tracking-widest">
        COLLECTION
      </h1>

      {/* SEARCH & FILTER BAR */}
      <div className="max-w-6xl mx-auto mb-8 flex flex-wrap gap-4 items-center justify-between">

        {/* Search */}
        <input
          type="text"
          placeholder="Search fragrances..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded w-64 focus:outline-none focus:border-yellow-500"
        />

        {/* Price Filter */}
        <div className="flex items-center gap-3">
          <span className="text-gray-400 text-sm">Max Price:</span>
          <input
            type="range"
            min="500"
            max="5000"
            step="100"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="accent-yellow-500"
          />
          <span className="text-yellow-400 text-sm w-20">₹ {maxPrice}</span>
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-yellow-500"
        >
          <option value="default">Sort By</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>

      </div>

      {/* PRODUCTS */}
      <div className="max-w-6xl mx-auto">
        <Products
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          wishlist={wishlist}
          setSelectedProduct={setSelectedProduct}
          setSelectedPage={setSelectedPage}
          search={search}
          maxPrice={maxPrice}
          sortBy={sortBy}
        />
      </div>

    </div>
  );
}

export default Shop;