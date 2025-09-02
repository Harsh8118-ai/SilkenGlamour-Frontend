import { useState, useEffect } from 'react';
import { useAuth } from '../../Store/auth';

const FilteredReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState('all'); // all, top, normal, bad
  const [sortOrder, setSortOrder] = useState('latest'); // latest, oldest
  const { user } = useAuth();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`${BASE_URL}/form/review`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const filterReviews = () => {
    let filtered = [...reviews];
    if (filter === 'top') {
      filtered = filtered.filter((review) => review.rating >= 4);
    } else if (filter === 'normal') {
      filtered = filtered.filter((review) => review.rating == 3);
    } else if (filter === 'bad') {
      filtered = filtered.filter((review) => review.rating <= 2);
    }

    if (sortOrder === 'latest') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return filtered;
  };

  return (
    <div className="p-6 mt-10 bg-MainBGColorYellow rounded-xl shadow-2xl max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center">Reviews</h2>

      <div className="flex justify-between mb-4">
        {/* Filter Dropdown */}
        <select
          className="p-2 rounded bg-BGColorYellow font-semibold"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Reviews</option>
          <option value="top">Top Rated</option>
          <option value="normal">Normal Rated</option>
          <option value="bad">Low Rated</option>
        </select>

        {/* Sort Dropdown */}
        <select
          className="p-2 rounded bg-BGColorYellow font-semibold"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="latest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Scrollable Reviews Container */}
      <div className="max-h-[400px] overflow-y-auto space-y-4 px-2 scrollbar-thin scrollbar-thumb-yellow-600 scrollbar-track-yellow-300">
        {filterReviews().slice(0, 10).map((review, index) => (
          <div key={review.id || `review-${index}`} className="border-2 pb-3 mb-3 border-MainBGColorYellow rounded-lg bg-LightBGColor p-2">
            <div className="flex items-baseline gap-8 sm:gap-16 justify-between px-2 sm:px-4">
              <h3 className="text-lg font-semibold text-gray-800">{review.username}</h3>
              <div className="text-sm text-gray-500">{review.date} at {review.time}</div>
            </div>

            <div className="flex items-center text-[#796855] text-xl mt-2 px-2 sm:px-4">
              {Array(Number(review.rating))
                .fill()
                .map((_, i) => (
                  <span key={`${review.id || `review-${index}`}-star-${i}`}>
                    <svg
                      width="20px"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 47.94 47.94"
                    >
                      <path
                        fill="#796855"
                        d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 
                          c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 
                          c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 
                          c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 
                          c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 
                          C22.602,0.567,25.338,0.567,26.285,2.486z"
                      ></path>
                    </svg>
                  </span>
                ))}
            </div>

            <p className="text-gray-700 mt-2 px-2 sm:px-4">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilteredReviews;
