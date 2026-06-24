function Navbar({ setSelectedPage, cartCount, user, setUser }) {
  return (
    <div className="fixed top-0 w-full bg-black text-white flex justify-between items-center px-6 py-4 z-50">

      <h1 className="text-lg tracking-widest cursor-pointer"
        onClick={() => setSelectedPage("home")}
      >
        CELESSE
      </h1>

      <div className="flex gap-6 items-center">

        <p onClick={() => setSelectedPage("home")} className="cursor-pointer hover:text-yellow-400">HOME</p>
        <p onClick={() => setSelectedPage("shop")} className="cursor-pointer hover:text-yellow-400">SHOP</p>
        <p onClick={() => setSelectedPage("about")} className="cursor-pointer hover:text-yellow-400">ABOUT</p>

        {/* ORDERS — only when logged in */}
        {user && (
          <p onClick={() => setSelectedPage("orders")} className="cursor-pointer text-yellow-400 hover:text-yellow-300">
            ORDERS
          </p>
        )}

        {/* WISHLIST — only when logged in */}
        {user && (
          <p onClick={() => setSelectedPage("wishlist")} className="cursor-pointer">
            ❤️
          </p>
        )}

        {/* CART — only when logged in */}
        {user && (
          <div
            className="relative cursor-pointer"
            onClick={() => setSelectedPage("cart")}
          >
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-xs px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        )}

        {/* LOGIN / LOGOUT */}
        {user ? (
          <div className="flex items-center gap-3">
            {/* ✅ CLICKABLE NAME — goes to profile */}
            <span
              className="text-gray-400 text-sm cursor-pointer hover:text-yellow-400"
              onClick={() => setSelectedPage("profile")}
            >
              {user?.name || user?.email || user}
            </span>
            <button
              onClick={() => {
                setUser(null);
                setSelectedPage("home");
              }}
              className="border border-red-500 text-red-500 px-3 py-1 text-sm rounded hover:bg-red-500 hover:text-black"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSelectedPage("auth")}
            className="border px-3 py-1 text-sm hover:bg-white hover:text-black"
          >
            Login
          </button>
        )}

      </div>
    </div>
  );
}

export default Navbar;