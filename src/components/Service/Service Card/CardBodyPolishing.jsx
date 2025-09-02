import { useState, useEffect, useContext } from 'react';
import { CartContext, CartProvider } from '../../Cart/CartContext';
import LeftCard from '../../Cart/LeftCard';
import RightCart from '../../Cart/RightCard';
import { Star, Clock } from 'lucide-react';




const CardBodyPolishing = () => {
  const [products, setProducts] = useState([]);
  const [type, setType] = useState('Polishing');
  const [isActive, setIsActive] = useState(true);
  const [IsSelect, setIsSelect] = useState(true);
  const [IsSelect2, setIsSelect2] = useState(false);
  const [expandedCard, setExpandedCard] = useState(null);

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    toggleActive();
  }, []);

  useEffect(() => {
    if (type) {
      fetch(`/Json Files/${type}.json`)
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.log(error));
    }
  }, [type]);

  const toggleActive = () => {
    setIsActive(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSelect1 = () => {
    setIsSelect(true);
    setIsSelect2(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSelect2 = () => {
    setIsSelect(false);
    setIsSelect2(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDetails = (productId) => {
    setExpandedCard(expandedCard === productId ? null : productId);
  };

  return (
    <CartProvider>
      <div className="flex justify-between w-full h-full bg-MainBGColorYellow">
        <LeftCard />

        <div className="sm:w-[60%] w-full mx-2 sm:mx-auto my-8">
          <div className={`w-full max-w-xl h-fit m-3 mx-auto`}>
            <div className="w-full mx-auto sticky top-0.5 sm:top-8 flex flex-col justify-center items-center h-fit">
              <h1 className="text-2xl font-bold mb-4 text-center">Select your Item :</h1>
              <div className="space-x-4 text-center">
                <button
                  className={`px-4 py-1.5 ${IsSelect ? 'bg-BGColorYellow' : 'bg-gray-400'} ${IsSelect ? 'border-2' : 'border-none'} border-black text-white rounded-full`}
                  onClick={() => {
                    setType('Polishing');
                    toggleActive();
                    toggleSelect1();
                  }}
                >
                  Polishing
                </button>
                <button
                  className={`px-4 py-1.5 ${IsSelect2 ? 'bg-BGColorYellow' : 'bg-gray-400'} ${IsSelect2 ? 'border-2' : 'border-none'} border-black text-white rounded-full`}
                  onClick={() => {
                    setType('Massage');
                    toggleActive();
                    toggleSelect2();
                  }}
                >
                  Massage
                </button>
              </div>
            </div>


            
            {products.length > 0 && (
              <div className="w-full h-full mt-4 hidden sm:block border rounded-xl px-6 py-3 border-BGColorYellow">
                <div className="w-full grid gap-6">
                  {products.map((product) => {
                    const isExpanded = expandedCard === product.id;
                    return (
                      <div
                        key={product.id}
                        className="bg-MainBGColorYellow  shadow-sm rounded-lg border-b border-BGColorYellow overflow-hidden transition-all duration-300 ease-in-out"
                      >
                        <div className="flex">
                          {/* Left Content */}
                          <div className="flex-1 p-4">
                            {/* Name */}
                            <h3 className="text-lg font-bold text-gray-900 leading-tight">
                              {product.name}
                            </h3>

                            {/* Rating */}
                            <div className="flex items-center font-semibold text-lg text-BGColorYellow mt-1">
                              <Star className="w-3.5 h-3.5 fill-BGColorYellow text-BGColorYellow" />
                              <span className="ml-1">
                                4.84 (507K reviews)
                              </span>
                            </div>

                            {/* Price */}
                            <div className="mt-1">
                              <span className="text-lg font-semibold text-gray-600">Starts at </span>
                              <span className="text-base font-semibold text-gray-900">₹{product.price}</span>
                              {product.offerprice && (
                                <span className="text-xs font-semibold text-red-700 line-through ml-1">₹{product.offerprice}</span>
                              )}
                            </div>

                            {/* Time  */}
                            <div className="mt-1 flex items-start gap-2">
                              <span className="text-base font-semibold text-BGColorYellow brightness-75 flex"><Clock className='h-3.5 mt-1.5'></Clock>{product.time}</span>
                            </div>

                            <div className='border border-dashed mt-2uu border-BGColorYellow'></div>


                            {/* Expanded Features */}
                            <div
                              className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'
                                }`}
                            >
                              {isExpanded && (
                                <div className="space-y-1 mt-1">
                                  {product.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2.5 flex-shrink-0"></div>
                                      <span className="text-lg text-BGColorYellow font-semibold">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right Image */}
                          <div className="w-36 h-36 relative flex-shrink-0 m-4 rounded-lg overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover cursor-pointer"
                              onClick={() => addToCart(product)}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                            {product.discount && (
                              <div className="absolute top-1 left-1 bg-red-500 text-white px-1 py-0.5 rounded text-xs font-medium">
                                {product.discount} OFF
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="px-4 pb-4 flex items-center justify-between pt-3">
                          {/* View details toggle */}
                          <button
                            onClick={() => toggleDetails(product.id)}
                            className={` text-lg font-medium mt-1 ${isExpanded ? "text-red-500" : "text-BGColorYellow"}`}
                          >
                            {isExpanded ? "Hide details" : "View details"}
                          </button>
                          <button
                            onClick={() => addToCart(product)}
                            className="bg-gradient-to-br from-[#877865] via-[#4d3e29] to-[#523f28] hover:bg-BGColorYellow text-LightBGColor px-4 py-1.5 rounded-lg text-lg font-medium transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}


            {/* MOBILE VIEW */}
            {products.length > 0 && (
              <div className="w-full h-full mt-4 sm:hidden">
                <div className="w-full grid gap-6">
                  {products.map((product) => {
                    const isExpanded = expandedCard === product.id;
                    return (
                      <div
                        key={product.id}
                        className="bg-MainBGColorYellow  shadow-sm rounded-lg border-b border-BGColorYellow overflow-hidden transition-all duration-300 ease-in-out"
                      >
                        <div className="flex">
                          {/* Left Content */}
                          <div className="flex-1 p-4">
                            {/* Name */}
                            <h3 className="text-base font-bold text-gray-900 leading-tight">
                              {product.name}
                            </h3>

                            {/* Rating */}
                            <div className="flex items-center font-semibold text-xs text-BGColorYellow mt-1">
                              <Star className="w-3.5 h-3.5 fill-BGColorYellow text-BGColorYellow" />
                              <span className="ml-1">
                                4.84 (507K reviews)
                              </span>
                            </div>

                            {/* Price */}
                            <div className="mt-1">
                              <span className="text-xs font-semibold text-gray-600">Starts at </span>
                              <span className="text-base font-semibold text-gray-900">₹{product.price}</span>
                              {product.offerprice && (
                                <span className="text-xs font-semibold text-red-700 line-through ml-1">₹{product.offerprice}</span>
                              )}
                            </div>



                            {/* Expanded Features */}
                            <div
                              className={`transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-40 opacity-100 mt-1' : 'max-h-0 opacity-0'
                                }`}
                            >
                              {isExpanded && (
                                <div className="space-y-1 mt-1">
                                  {product.features.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                      <div className="w-1 h-1 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                      <span className="text-xs text-BGColorYellow font-semibold">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Right Image */}
                          <div className="w-24 h-24 relative flex-shrink-0 m-4 rounded-lg overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover cursor-pointer"
                              onClick={() => addToCart(product)}
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                            {product.discount && (
                              <div className="absolute top-1 left-1 bg-red-500 text-white px-1 py-0.5 rounded text-xs font-medium">
                                {product.discount} OFF
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Bottom Section */}
                        <div className="px-4 pb-4 flex items-center justify-between pt-3">
                          {/* View details toggle */}
                          <button
                            onClick={() => toggleDetails(product.id)}
                            className={` text-xs font-medium mt-1 ${isExpanded ? "text-red-500" : "text-BGColorYellow"}`}
                          >
                            {isExpanded ? "Hide details" : "View details"}
                          </button>
                          <button
                            onClick={() => addToCart(product)}
                            className="bg-gradient-to-br from-[#877865] via-[#4d3e29] to-[#523f28] hover:bg-BGColorYellow text-LightBGColor px-4 py-1.5 rounded-lg text-sm font-medium transition-colors"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <RightCart />
      </div>
    </CartProvider>
  );
};

export default CardBodyPolishing;
