import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

function Products({
  addToCart,
  addToWishlist,
  setSelectedProduct,
  setSelectedPage,
  search = "",
  maxPrice = 5000,
  sortBy = "default",
}) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => setProducts(res.data))
      .catch(() => console.log("Error fetching products"));
  }, []);

  const filtered = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .filter((p) => p.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === "low") return a.price - b.price;
      if (sortBy === "high") return b.price - a.price;
      if (sortBy === "name") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {filtered.length === 0 ? (
        <p className="text-center text-gray-400 col-span-3">
          No products found
        </p>
      ) : (
        filtered.map((product, i) => (
          <div key={i} className="bg-gray-800 p-4 rounded-lg">
            <img
              src={`/src/assets/${product.image}.jpg`}
              alt={product.title}
              className="h-48 w-full object-cover mb-4 rounded"
            />
            <h2 className="text-lg">{product.title}</h2>
            <p className="text-yellow-400 mb-3">₹ {product.price}</p>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() =>
                  addToCart({
                    ...product,
                    image: `/src/assets/${product.image}.jpg`,
                  })
                }
                className="bg-yellow-500 text-black px-4 py-2 rounded"
              >
                Add to Cart
              </button>

              <button
                onClick={() => {
                  addToWishlist({
                    ...product,
                    image: `/src/assets/${product.image}.jpg`,
                  });
                  toast.success("Added to wishlist ❤️");
                }}
                className="border px-3 py-1 text-sm"
              >
                ❤️
              </button>

              <button
                onClick={() => {
                  setSelectedProduct({
                    ...product,
                    image: `/src/assets/${product.image}.jpg`,
                  });
                  setSelectedPage("product");
                }}
                className="border px-3 py-1 text-sm"
              >
                View
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Products;