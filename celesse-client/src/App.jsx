import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Shop from "./pages/Shop";
import Cart from "./components/Cart";
import ProductDetails from "./pages/ProductDetails";
import Auth from "./pages/Auth";
import Wishlist from "./pages/Wishlist";
import OrderHistory from "./pages/OrderHistory";
import Profile from "./pages/Profile";

function App() {
  const [selectedPage, setSelectedPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("celesse-user");
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    try {
      if (user) {
        const cartKey = `celesse-cart-${user.email || user}`;
        const wishlistKey = `celesse-wishlist-${user.email || user}`;
        const savedCart = localStorage.getItem(cartKey);
        const savedWishlist = localStorage.getItem(wishlistKey);
        setCart(savedCart ? JSON.parse(savedCart) : []);
        setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
      } else {
        setCart([]);
        setWishlist([]);
      }
    } catch {
      setCart([]);
      setWishlist([]);
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (loading) return;
    const key = user ? `celesse-cart-${user.email || user}` : "celesse-cart";
    localStorage.setItem(key, JSON.stringify(cart));
  }, [cart, user]);

  useEffect(() => {
    if (loading) return;
    const key = user ? `celesse-wishlist-${user.email || user}` : "celesse-wishlist";
    localStorage.setItem(key, JSON.stringify(wishlist));
  }, [wishlist, user]);

  useEffect(() => {
    localStorage.setItem("celesse-user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "instant" });
}, [selectedPage]);
  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const addToWishlist = (product) => {
    if (!wishlist.find((item) => item._id === product._id)) {
      setWishlist((prev) => [...prev, product]);
    }
  };

  if (loading) return null;

  if (selectedPage === "auth") {
    return <Auth setUser={setUser} setSelectedPage={setSelectedPage} />;
  }

  if (selectedPage === "wishlist") {
    return (
      <>
        <Navbar setSelectedPage={setSelectedPage} cartCount={cart.length} user={user} setUser={setUser} />
        <Wishlist wishlist={wishlist} setWishlist={setWishlist} addToCart={addToCart} setSelectedPage={setSelectedPage} />
      </>
    );
  }

  if (selectedPage === "about") {
    return (
      <>
        <Navbar setSelectedPage={setSelectedPage} cartCount={cart.length} user={user} setUser={setUser} />
        <About setSelectedPage={setSelectedPage} />
      </>
    );
  }

  if (selectedPage === "product") {
    return (
      <>
        <Navbar setSelectedPage={setSelectedPage} cartCount={cart.length} user={user} setUser={setUser} />
        <ProductDetails product={selectedProduct} addToCart={addToCart} setSelectedPage={setSelectedPage} />
      </>
    );
  }

  if (selectedPage === "cart") {
    return (
      <>
        <Navbar setSelectedPage={setSelectedPage} cartCount={cart.length} user={user} setUser={setUser} />
        <Cart cart={cart} setCart={setCart} user={user} setSelectedPage={setSelectedPage} />
      </>
    );
  }

  if (selectedPage === "shop") {
    return (
      <>
        <Navbar setSelectedPage={setSelectedPage} cartCount={cart.length} user={user} setUser={setUser} />
        <Shop addToCart={addToCart} addToWishlist={addToWishlist} wishlist={wishlist} setSelectedProduct={setSelectedProduct} setSelectedPage={setSelectedPage} />
      </>
    );
  }

  if (selectedPage === "orders") {
    return (
      <>
        <Navbar setSelectedPage={setSelectedPage} cartCount={cart.length} user={user} setUser={setUser} />
        <OrderHistory user={user} setSelectedPage={setSelectedPage} />
      </>
    );
  }

  if (selectedPage === "profile") {
    return (
      <>
        <Navbar setSelectedPage={setSelectedPage} cartCount={cart.length} user={user} setUser={setUser} />
        <Profile user={user} setUser={setUser} setSelectedPage={setSelectedPage} cart={cart} wishlist={wishlist} />
      </>
    );
  }

  return (
    <>
      <Navbar setSelectedPage={setSelectedPage} cartCount={cart.length} user={user} setUser={setUser} />
      <Home addToCart={addToCart} addToWishlist={addToWishlist} wishlist={wishlist} setSelectedProduct={setSelectedProduct} setSelectedPage={setSelectedPage} />
    </>
  );
}

export default App;