function About({ setSelectedPage }) {
  return (
    <div className="bg-black text-white pt-32 pb-20 px-6">

      {/* TITLE */}
      <h1 className="text-center text-4xl tracking-[0.5em] mb-12">
        ABOUT CELESSE
      </h1>

      {/* INTRO */}
      <div className="max-w-4xl mx-auto text-center text-gray-300 leading-8 mb-16">
        <p className="mb-6">
          Celesse is not just a fragrance brand — it is an experience crafted to elevate your presence.
          Every perfume is designed to reflect elegance, confidence, and individuality.
        </p>

        <p>
          Our collection blends modern luxury with timeless scents. From deep woody notes
          to fresh floral tones, every bottle tells a story.
        </p>
      </div>

      {/* GRID SECTION */}
      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-20">

        <div className="bg-gray-900 p-6 rounded-xl text-center">
          <h3 className="text-xl mb-3 text-yellow-500">Luxury Craftsmanship</h3>
          <p className="text-gray-400 text-sm">
            Each fragrance is carefully developed using premium ingredients,
            ensuring long-lasting and memorable scents.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl text-center">
          <h3 className="text-xl mb-3 text-yellow-500">Timeless Elegance</h3>
          <p className="text-gray-400 text-sm">
            Inspired by classic and modern styles, our perfumes are designed
            to suit every personality and occasion.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl text-center">
          <h3 className="text-xl mb-3 text-yellow-500">Signature Identity</h3>
          <p className="text-gray-400 text-sm">
            We believe fragrance is identity. Our scents are created to leave
            a lasting impression wherever you go.
          </p>
        </div>

      </div>

      {/* STORY SECTION */}
      <div className="max-w-5xl mx-auto text-center text-gray-300 leading-8 mb-20">
        <h2 className="text-2xl mb-6 text-white">Our Story</h2>

        <p className="mb-4">
          Founded with a passion for elegance and detail, Celesse was created
          to redefine luxury fragrances for the modern world.
        </p>

        <p className="mb-4">
          We combine art, science, and creativity to design scents that are not
          only beautiful but unforgettable.
        </p>

        <p>
          Welcome to Celesse — where elegance meets essence.
        </p>
      </div>

      {/* CTA BUTTON (WORKING) */}
      <div className="text-center">
        <button
          onClick={() => setSelectedPage("shop")}
          className="border border-yellow-500 px-6 py-2 hover:bg-yellow-500 hover:text-black transition"
        >
          EXPLORE COLLECTION
        </button>
      </div>

    </div>
  );
}

export default About;