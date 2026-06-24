import Hero from "../components/Hero";
import Products from "../components/Products";

function Home({
  addToCart,
  addToWishlist,
  setSelectedProduct,
  setSelectedPage,
}) 
{
  return (
    <div className="bg-black text-white">

      {/* HERO */}
      <Hero setSelectedPage={setSelectedPage} />

      {/* COLLECTION SECTION */}
      <div id="collection" className="pt-20">
        <Products
          addToCart={addToCart}
          addToWishlist={addToWishlist}
          setSelectedProduct={setSelectedProduct}
          setSelectedPage={setSelectedPage}
        />
      </div>

    </div>
  );
}

export default Home;