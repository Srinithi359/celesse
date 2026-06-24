import { useEffect, useState } from "react";
import axios from "axios";

function OrderHistory({ user, setSelectedPage }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const email = user?.email || user;
    axios
      .get(`http://localhost:5000/orders/${email}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div className="bg-black text-white min-h-screen pt-32 px-6 text-center">
        <h1 className="text-3xl mb-6 tracking-widest">ORDER HISTORY</h1>
        <p className="text-gray-400">Please login to view your orders</p>
        <button
          onClick={() => setSelectedPage("auth")}
          className="mt-6 bg-yellow-500 text-black px-6 py-2 rounded"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen pt-32 px-6">
      <h1 className="text-3xl text-center mb-10 tracking-widest">
        ORDER HISTORY
      </h1>

      {loading ? (
        <p className="text-center text-gray-400">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-400">No orders yet</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {orders.map((order, i) => (
            <div key={i} className="bg-gray-900 p-6 rounded-lg border border-gray-700">
              
              {/* ORDER HEADER */}
              <div className="flex justify-between mb-4">
                <p className="text-gray-400 text-sm">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-yellow-400 font-semibold">₹ {order.total}</p>
              </div>

              {/* ORDER ITEMS */}
              <div className="space-y-3">
                {order.items.map((item, j) => (
                  <div key={j} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p>{item.title}</p>
                      <p className="text-gray-400 text-sm">₹ {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* STATUS */}
              <div className="mt-4 flex justify-end">
                <span className="bg-green-900 text-green-400 text-xs px-3 py-1 rounded-full">
                  ✅ Delivered
                </span>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;