import { useState } from "react";

// ✅ IMAGE IMPORTS
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";
import p5 from "../assets/p5.jpg";
import p6 from "../assets/p6.jpg";
import p7 from "../assets/p7.jpg";
import p8 from "../assets/p8.jpg";
import p9 from "../assets/p9.jpg";

// ✅ IMAGE MAP
const imageMap = { p1, p2, p3, p4, p5, p6, p7, p8, p9 };

function ProductDetails({ product, addToCart, setSelectedPage }) {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen pt-32 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* IMAGE */}
        <div>
          <img
            src={imageMap[product.image] || product.image}
            alt={product.title}
            className="w-full h-[450px] object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-4xl mb-4 tracking-wide">
            {product.title}
          </h1>

          <p className="text-yellow-400 text-2xl mb-6">
            ₹ {product.price}
          </p>

          <p className="text-gray-400 mb-6 leading-relaxed">
            Experience luxury fragrance crafted with elegance and long-lasting essence.
            Designed to elevate your presence and leave a lasting impression.
          </p>

          {/* FEATURES */}
          <ul className="text-gray-400 mb-6 space-y-2">
            <li>• Long-lasting premium fragrance</li>
            <li>• Perfect for daily & special occasions</li>
            <li>• Elegant and modern scent profile</li>
          </ul>

          {/* QUANTITY */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={decrease}
              className="border px-3 py-1 hover:bg-white hover:text-black"
            >
              -
            </button>

            <span className="text-lg">{quantity}</span>

            <button
              onClick={increase}
              className="border px-3 py-1 hover:bg-white hover:text-black"
            >
              +
            </button>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-400"
            >
              Add to Cart
            </button>

            <button
              onClick={() => setSelectedPage("shop")}
              className="border px-6 py-2 hover:bg-white hover:text-black"
            >
              Back
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProductDetails;