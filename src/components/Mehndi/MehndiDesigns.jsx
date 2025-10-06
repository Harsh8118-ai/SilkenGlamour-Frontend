import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const designs = [
  {
    id: 1,
    title: "Bridal Full Hand Design",
    image: "https://res.cloudinary.com/dpnykjono/image/upload/v1759756514/Photo_1_z1raod.avif",
  },
  {
    id: 2,
    title: "Simple Arabic Design",
    image: "https://res.cloudinary.com/dpnykjono/image/upload/v1759756514/Photo_3_clqvod.avif",
  },
  {
    id: 3,
    title: "Front Hand Floral Design",
    image: "https://res.cloudinary.com/dpnykjono/image/upload/v1759756514/Photo_2_lmojmw.avif",
  },
  {
    id: 4,
    title: "Back Hand Mandala Design",
    image: "https://res.cloudinary.com/dpnykjono/image/upload/v1759756514/Photo_5_ekmsnz.jpg",
  },
  {
    id: 5,
    title: "Back Hand Mandala Design",
    image: "https://res.cloudinary.com/dpnykjono/image/upload/v1759756514/Photo_4_lm0gau.avif",
  },
  {
    id: 6,
    title: "Back Hand Mandala Design",
    image: "https://res.cloudinary.com/dpnykjono/image/upload/v1759756513/Photo_7_f7qcav.jpg",
  },
  {
    id: 7,
    title: "Back Hand Mandala Design",
    image: "https://res.cloudinary.com/dpnykjono/image/upload/v1759756512/Photo_8_xpuanh.jpg",
  },
  {
    id: 8,
    title: "Back Hand Mandala Design",
    image: "https://res.cloudinary.com/dpnykjono/image/upload/v1759756512/Photo_6_rwdqik.jpg",
  },
  {
    id: 9,
    title: "Back Hand Mandala Design",
    image: "https://res.cloudinary.com/dpnykjono/image/upload/v1759756512/photo_10_tcpivx.jpg",
  },
  {
    id: 10,
    title: "Back Hand Mandala Design",
    image: "https://res.cloudinary.com/dpnykjono/image/upload/v1759756512/Photo_11_vuwtmr.jpg",
  },
  {
    id: 11,
    title: "Back Hand Mandala Design",
    image: "https://res.cloudinary.com/dpnykjono/image/upload/v1759756512/Photo_9_tpgmsd.jpg",
  },
  {
    id: 12,
    title: "Back Hand Mandala Design",
    image: "https://res.cloudinary.com/dpnykjono/image/upload/v1759756512/Photo_12_wknn5y.jpg",
  },
];

export default function MehndiDesigns() {
  const [selectedDesign, setSelectedDesign] = useState(null);

  const handleWhatsApp = (design) => {
    const message = `🌸 Mehndi Design Request 🌸\n\n*Title:* ${design.title}\n*Image:* ${design.image}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919266037001?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="py-10 px-4 sm:px-8 bg-MainBGColorYellow min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-BGColorYellow">
        Mehndi Designs Collection
      </h1>

      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {designs.map((design) => (
          <div
            key={design.id}
            className="relative cursor-pointer group"
            onClick={() => setSelectedDesign(design)}
          >
            <img
              src={design.image}
              alt={design.title}
              className="w-full h-48 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
            />
            {/* <p className="mt-2 text-center text-sm font-medium text-gray-700">
              {design.title}
            </p> */}
          </div>
        ))}
      </div>

      {/* Modal */}
      <Dialog
        open={!!selectedDesign}
        onClose={() => setSelectedDesign(null)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 overflow-y-auto"
      >
        {selectedDesign && (
          <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-auto p-4 sm:p-6 mt-20 mb-10">
            {/* Close Button */}
            <button
              onClick={() => setSelectedDesign(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition"
            >
              <X size={22} />
            </button>

            {/* Image (auto-fit any size) */}
            <div className="flex justify-center">
              <img
                src={selectedDesign.image}
                alt={selectedDesign.title}
                className="rounded-lg mb-4 max-h-[80vh] w-auto object-contain"
              />
            </div>

            {/* Title */}
            <h2 className="font-semibold text-lg text-center text-gray-800 mb-3">
              {selectedDesign.title}
            </h2>

            {/* WhatsApp Button */}
            <Button
              onClick={() => handleWhatsApp(selectedDesign)}
              className="bg-green-600 hover:bg-green-700 text-white w-full"
            >
              Send on WhatsApp
            </Button>
          </div>
        )}
      </Dialog>
    </section>
  );
}
