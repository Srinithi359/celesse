function Wishlist({ wishlist, setWishlist, addToCart, setSelectedPage }) {

  // ✅ REMOVE FROM WISHLIST
  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item._id !== id));
  };

  // ✅ MOVE TO CART
  const moveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item._id);
  };

  return (
    <div className="bg-black text-white min-h-screen pt-32 px-6">
      <h1 className="text-3xl text-center mb-10 tracking-widest">WISHLIST</h1>

      {wishlist.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-400 mb-6">No items in wishlist</p>
          <button
            onClick={() => setSelectedPage("shop")}
            className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-400"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {wishlist.map((item, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-lg">

              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-cover mb-4 rounded"
              />

              {/* TITLE & PRICE */}
              <h2 className="text-lg mb-1">{item.title}</h2>
              <p className="text-yellow-400 mb-4">₹ {item.price}</p>

              {/* BUTTONS */}
              <div className="flex gap-2">
                <button
                  onClick={() => moveToCart(item)}
                  className="bg-yellow-500 text-black px-4 py-2 rounded text-sm hover:bg-yellow-400 flex-1"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item._id)}
                  className="border border-red-500 text-red-500 px-4 py-2 rounded text-sm hover:bg-red-500 hover:text-black"
                >
                  Remove
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;