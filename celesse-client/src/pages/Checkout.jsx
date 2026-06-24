import { useState } from "react";

function Checkout({ cart, setCart, setSelectedPage }) {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = () => {
    if (cart.length === 0) return;

    setOrderPlaced(true);
    setCart([]); // clear cart
  };

  return (
    <div className="bg-black text-white min-h-screen pt-32 px-6 text-center">

      <h1 className="text-3xl mb-10 tracking-widest">
        CHECKOUT
      </h1>

      {/* BEFORE ORDER */}
      {!orderPlaced && (
        <>
          <div className="max-w-2xl mx-auto">

            {/* TOTAL */}
            <div className="flex justify-between text-lg mb-10">
              <span>Total</span>
              <span className="text-yellow-400">₹ {total}</span>
            </div>

            {/* PLACE ORDER BUTTON */}
            <button
              onClick={handlePlaceOrder}
              className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-400"
            >
              Place Order
            </button>

          </div>
        </>
      )}

      {/* AFTER ORDER */}
      {orderPlaced && (
        <div className="mt-10">

          <h2 className="text-green-400 text-xl mb-6">
            🎉 Order Placed Successfully!
          </h2>

          <button
            onClick={() => setSelectedPage("home")}
            className="bg-yellow-500 text-black px-6 py-2 rounded hover:bg-yellow-400"
          >
            Continue Shopping
          </button>

        </div>
      )}
    </div>
  );
}

export default Checkout;