function Hero({ setSelectedPage }) {
  return (
    <div className="relative h-screen w-full overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <img
        src="/hero.png"
        alt="hero"
        className="absolute inset-0 w-full h-full object-cover object-[center_25%]"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CONTENT (CENTERED) */}
      <div className="relative h-full flex items-center justify-center text-center">
        <div className="max-w-xl px-6">

          <h1 className="text-6xl font-light tracking-widest mb-6 leading-tight">
            CELESSE
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            Discover the essence of elegance. Luxury fragrances crafted to
            define your presence.
          </p>

          <button
            onClick={() => {
  const section = document.getElementById("collection");
  section?.scrollIntoView({ behavior: "smooth" });
}}
            className="border border-white px-8 py-3 text-sm tracking-wide hover:bg-white hover:text-black transition-all duration-300"
          >
            EXPLORE COLLECTION
          </button>

        </div>
      </div>

    </div>
  );
}

export default Hero;