import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Cart({ cart, setCart, user, setSelectedPage }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  // ✅ INCREASE QUANTITY
  const increaseQty = (index) => {
    const updated = [...cart];
    updated[index] = {
      ...updated[index],
      quantity: (updated[index].quantity || 1) + 1,
    };
    setCart(updated);
  };

  // ✅ DECREASE QUANTITY
  const decreaseQty = (index) => {
    const updated = [...cart];
    const currentQty = updated[index].quantity || 1;
    if (currentQty === 1) {
      // Remove item if quantity reaches 0
      updated.splice(index, 1);
      toast.success("Item removed from cart");
    } else {
      updated[index] = {
        ...updated[index],
        quantity: currentQty - 1,
      };
    }
    setCart(updated);
  };

  // ✅ REMOVE ITEM
  const removeItem = (index) => {
    const updated = [...cart];
    updated.splice(index, 1);
    setCart(updated);
    toast.success("Item removed from cart");
  };

  // ✅ CLEAR ENTIRE CART
  const clearCart = () => {
    setCart([]);
    toast.success("Cart cleared!");
  };

  // ✅ TOTAL (quantity aware)
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // ✅ CHECKOUT BUTTON
  const handleCheckout = () => {
    if (!user) {
      toast.error("Please login first!");
      setSelectedPage("auth");
      return;
    }
    setShowCheckout(true);
  };

  // ✅ PLACE ORDER
  const handlePlaceOrder = async () => {
    if (!form.name || !form.address || !form.phone) {
      toast.error("Please fill all fields!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/orders", {
        items: cart,
        total,
        email: user?.email || user,
        customer: form,
      });

      toast.success("Order placed successfully! 🎉");
      setOrderSuccess(true);
      setCart([]);
      setShowCheckout(false);
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    }
  };

  return (
    <div className="bg-black text-white min-h-screen pt-32 px-6">
      <h1 className="text-3xl text-center mb-10">YOUR CART</h1>

      {/* SUCCESS MESSAGE */}
      {orderSuccess && (
        <div className="bg-green-900 border border-green-500 text-green-300 px-6 py-4 rounded mb-6 text-center max-w-xl mx-auto">
          ✅ Your order has been placed successfully!
        </div>
      )}

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-400 mb-6">Your cart is empty</p>
          <button
            onClick={() => setSelectedPage("shop")}
            className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-400"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* CART ITEMS */}
          <div className="max-w-4xl mx-auto space-y-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-800 p-4 rounded"
              >
                {/* LEFT — image + name */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-gray-400 text-sm">₹ {item.price} each</p>
                  </div>
                </div>

                {/* RIGHT — quantity + price + remove */}
                <div className="flex flex-col items-end gap-2">

                  {/* QUANTITY SELECTOR */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(index)}
                      className="w-8 h-8 bg-gray-700 rounded hover:bg-gray-600 text-lg font-bold"
                    >
                      −
                    </button>
                    <span className="w-8 text-center">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() => increaseQty(index)}
                      className="w-8 h-8 bg-gray-700 rounded hover:bg-gray-600 text-lg font-bold"
                    >
                      +
                    </button>
                  </div>

                  {/* ITEM TOTAL */}
                  <p className="text-yellow-400">
                    ₹ {item.price * (item.quantity || 1)}
                  </p>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeItem(index)}
                    className="text-red-500 text-sm hover:text-red-400"
                  >
                    REMOVE
                  </button>

                </div>
              </div>
            ))}
          </div>

          {/* TOTAL + CLEAR CART */}
          <div className="max-w-4xl mx-auto mt-8">
            <div className="flex justify-between mb-4">
              <p className="text-xl">Total</p>
              <p className="text-yellow-400 text-xl">₹ {total}</p>
            </div>
            <div className="flex justify-between">
              <button
                onClick={clearCart}
                className="text-red-500 text-sm border border-red-500 px-4 py-1 rounded hover:bg-red-500 hover:text-black"
              >
                Clear Cart
              </button>
              {!showCheckout && (
                <button
                  onClick={handleCheckout}
                  className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-400"
                >
                  Checkout
                </button>
              )}
            </div>
          </div>

          {/* CHECKOUT FORM */}
          {showCheckout && (
            <div className="max-w-md mx-auto mt-10 bg-gray-900 p-6 rounded">
              <h2 className="text-xl mb-4 text-center">Checkout Details</h2>

              <input
                type="text"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full mb-3 p-2 bg-black border border-gray-700 rounded"
              />

              <input
                type="text"
                placeholder="Address"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full mb-3 p-2 bg-black border border-gray-700 rounded"
              />

              <input
                type="text"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full mb-4 p-2 bg-black border border-gray-700 rounded"
              />

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-yellow-500 text-black py-2 rounded hover:bg-yellow-400"
              >
                Place Order
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;