import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaSearch } from "react-icons/fa";

const keywordToFile = {
  "Bleach": "Bleach.json",
  "Bridal": "Bridal.json",
  "Clean-Up": "Cleanup.json",
  "De-Tan": "Dtan.json",
  "Engagement": "Engagement.json",
  "Face Waxing": "FaceWaxing.json",
  "Facial": "Facial.json",
  "Hair Care": "HairCare.json",
  "Hair Colour": "HairColour.json",
  "Manicure": "Mani.json",
  "Massage": "Massage.json",
  "Nail Art": "NailArtWork.json",
  "Nail Extension": "NailExtension.json",
  "Party": "Party.json",
  "Pedicure": "Pedi.json",
  "Body Polishing": "Polishing.json",
  "Threading": "Threading.json",
  "Waxing Normal": "WaxingNormal.json",
  "Rica Waxing": "WaxingRica.json",
};

const keywords = Object.keys(keywordToFile);

const SearchServices = () => {
  const [search, setSearch] = useState("");
  const [services, setServices] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const navigate = useNavigate();

  // Load data on search or keyword change
  useEffect(() => {
    const loadData = async () => {
      try {
        if (search.trim()) {
          const res = await fetch("/Json Files/AllServices.json");
          const allData = await res.json();
          const filtered = allData.filter(service =>
            service.name.toLowerCase().includes(search.toLowerCase())
          );
          setServices(filtered);
        } else if (selectedKeyword) {
          const fileName = keywordToFile[selectedKeyword];
          const res = await fetch(`/Json Files/${fileName}`);
          const keywordData = await res.json();
          setServices(keywordData);
        } else {
          setServices([]);
        }
      } catch (err) {
        console.error("Error loading services:", err);
        setServices([]);
      }
    };

    loadData();
  }, [search, selectedKeyword]);

  const handleKeywordClick = (keyword) => {
    setSearch("");
    setSelectedKeyword(keyword);
  };

  return (
    <div className="p-4 min-h-screen bg-MainBGColorYellow">
      {/* Header */}
      <div className="flex items-center space-x-2 text-[#6b4c3b] font-semibold text-lg mb-4">
        <FaArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
        <span>Search Services</span>
      </div> 
 
      {/* Search Bar */}
      <div className="relative mb-6">
        <FaSearch className="absolute top-3 left-3 text-BGColorYellow" />
        <input
          type="text"
          placeholder="Search for Beauty"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSelectedKeyword("");
          }}
          className="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-pink-200 focus:outline-none focus:ring-2 focus:ring-BGColorYellow shadow-sm placeholder:text-gray-400"
        />
      </div>

      {/* Popular Search */}
      <h2 className="text-sm font-medium text-gray-700 mb-2">Popular Search</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {keywords.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleKeywordClick(tag)}
            className={`flex items-center px-3 py-1.5 rounded-md border text-sm text-[#6b4c3b] shadow-sm transition ${selectedKeyword === tag
                ? "bg-LightBGColor border-yellow-900"
                : "bg-white border-gray-200 hover:bg-pink-50"
              }`}
          >
            <svg
              className="w-3 h-3 mr-1 text-BGColorYellow"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M2 10l5 5L18 4" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
            {tag}
          </button>
        ))}
      </div>

      {/* Service Results */}
      {services.length > 0 ? (
        <div className="grid grid-cols-2 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              onClick={() => navigate(service.href)}
            >
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-2">
                <h3 className="text-sm font-semibold text-[#6b4c3b] truncate">{service.name}</h3>
                <p className="text-xs text-gray-500 line-through">₹{service.offerprice}</p>
                <p className="text-sm text-BGColorYellow font-bold">₹{service.price}</p>
              </div>
            </div>
          ))}
          <div className="mb-14"></div>
        </div>
      ) : (
        <p className="text-sm text-gray-500">No matching services found.</p>
      )}
    </div>
  );
};

export default SearchServices;
