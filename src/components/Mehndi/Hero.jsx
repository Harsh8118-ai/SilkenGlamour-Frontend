import { Link } from "react-router-dom";

export default function Hero() {
  
  return (
    <>
      <section className="relative w-full bg-gradient-to-b from-[#6C0A12] to-[#3E2B2A] text-center text-white py-10 sm:py-16 px-4 lg:w-[80%] lg:mx-auto overflow-hidden rounded-3xl shadow-lg">
        {/* Decorative Pattern Background */}
        <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dpnykjono/image/upload/v1759599850/d16b8799-a131-4712-8316-4a63acc54aaf_ql9mzh.png')] bg-cover bg-center opacity-10"></div>

        <div className="relative max-w-3xl mx-auto space-y-6">
          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-wide text-[#FFD369]">
            KARWA CHAUTH <br /> SPECIAL MEHNDI
          </h1>

          {/* Offer Highlight */}
          <div className="inline-block bg-[#FFD369] text-[#6C0A12] px-6 py-2 rounded-full text-lg font-semibold shadow-md">
            Mehndi Starting @ Just <span className="font-bold text-xl">₹699</span>
          </div>

          {/* Booking Offer */}
          <p className="text-base md:text-lg text-[#FDEBD0]">
            Pre-Book Your Slot Now in Just ₹99 before it’s too late!
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <Link to="/book"><button
              className="w-full sm:w-auto py-4 px-8 rounded-xl bg-[#FFD369] text-[#6C0A12] font-bold shadow-lg hover:scale-105 transition-all duration-300"
            >
              Book Your Mehndi Slot
            </button></Link>
            <Link to="/book"><button
              className="w-full sm:w-auto py-4 px-8 rounded-xl border-2 border-[#FFD369] text-[#FFD369] font-semibold hover:bg-[#FFD369] hover:text-[#6C0A12] transition-all duration-300"
            >
              Get Free Design Consult
            </button></Link>
          </div>

          {/* Urgency Tag */}
          <div className="mt-6 inline-flex items-center gap-2 bg-[#FFD369]/20 border border-[#FFD369]/40 rounded-full px-4 py-2 text-sm font-medium text-[#FFD369]">
            <svg
              className="w-4 h-4 text-[#FFD369]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Few days left — hurry!
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center items-center gap-6 pt-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#0B8A63] flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-sm font-medium">Verified Mehndi Artists</span>
            </div>

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-[#FFD369]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-2 text-sm font-semibold">4.9 / 5</span>
            </div>
          </div>
        </div>

      </section>

    </>
  );
}
