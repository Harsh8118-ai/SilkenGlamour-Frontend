import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../Store/auth';
import { FaUser } from "react-icons/fa";
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

const ReviewStats = () => {
  const [reviews, setReviews] = useState([]);
  const { user } = useAuth();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

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

  const categorizeReviews = () => {
    return {
      top: reviews.filter((review) => review.rating >= 4),
      normal: reviews.filter((review) => review.rating == 3),
      bad: reviews.filter((review) => review.rating <= 2),
    };
  };

  const { top, normal, bad } = categorizeReviews();
  const totalReviews = reviews.length;
  const averageRating = (
    reviews.reduce((sum, r) => sum + Number(r.rating), 0) / totalReviews
  ).toFixed(1);

  // Function to render stars dynamically
  const renderStars = (avg) => {
    return [...Array(5)].map((_, i) => (
      <motion.svg
        key={i}
        width="28px"
        height="28px"
        viewBox="0 0 24 24"
        fill={i < avg ? '#56442f' : '#475569'}
        className="inline-block mx-0.5"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: i * 0.3, duration: 1, type: 'spring' }}
      >
        <path d="M12 2l2.93 6.26L22 9.27l-5 4.87 1.18 7.01L12 17.77l-6.18 3.38L7 14.14 2 9.27l7.07-1.01L12 2z" />
      </motion.svg>
    ));
  };

  // Function to calculate rating distribution
  const getRatingDistribution = () => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      counts[review.rating]++;
    });

    return counts;
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="p-6 mt-10 bg-MainBGColorYellow rounded-xl shadow-lg max-w-3xl mx-auto"
      whileHover={{ scale: 1.05, rotateX: 5, rotateY: 6 }}
    >
      <motion.h2
        className="text-2xl font-bold text-center"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.2 }}
      >Ratings and Reviews</motion.h2>

      <motion.div
        className='flex justify-around items-center mb-5'
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3 }}
      >
        {/* Star Rating Display */}
        <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.1 }}>
          <motion.p
            className="text-4xl sm:text-8xl font-bold"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ duration: 0.5 }}
          >
            {isNaN(averageRating) ? 'N/A' : averageRating}
          </motion.p>
          <div className="flex items-center mb-2 h-6 sm:h-full sm:w-full w-28">{renderStars(isNaN(averageRating) ? 0 : Math.round(averageRating))}</div>
          <div className="flex items-center gap-2">
            <FaUser size={20} color="#505050" />
            <p className="text-1xl sm:text-2xl font-bold text-[#505050]">{totalReviews.toLocaleString()}</p>
          </div>
        </motion.div>

        {/* Rating Distribution Bar */}
        {/* <motion.div className="w-full max-w-md mt-4">
          {[5, 4, 3, 2, 1].map((rating) => {
            const percentage = totalReviews > 0 ? (ratingDistribution[rating] / totalReviews) * 100 : 0;

            return (
              <motion.div 
                key={rating} 
                className="flex items-center space-x-2 mb-1"
                initial={{ width: 0 }}
                animate={{ width: percentage + "%" }}
                transition={{ duration: 1.2, delay: 0.2 }}
                whileHover={{ scale: 1.1 }}
              >
                <span className="w-6 text-right font-semibold">{rating}</span>
                <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-BGColorYellow rounded-full"
                    style={{ width: `${percentage}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  ></motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div> */}

        <div className="w-full max-w-md mt-4">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = ratingDistribution[rating];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;

            return (
              <motion.div
                key={rating}
                className="flex items-center space-x-3 mb-2"
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: rating * 0.1 }}
              >
                {/* Rating Number */}
                <span className="w-6 text-right font-semibold text-gray-700">{rating}</span>

                {/* Animated Bar */}
                <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden relative">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[#95836d] via-[#6e5d49] to-[#56442f] shadow-md"
                    style={{ width: `${percentage}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    whileHover={{ scale: 1.05 }}
                  ></motion.div>
                </div>

                {/* Count Display */}
                <motion.span
                  className="text-sm font-semibold text-gray-600"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: rating * 0.1 }}
                >
                  {count}
                </motion.span>
              </motion.div>
            );
          })}
        </div>


      </motion.div>
      {/* View Reviews Button */}
      <motion.div className="flex justify-center mt-6">
        <Link to="review">
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-[#56442f] via-[#6e5d49] to-[#56442f] text-MainBGColorYellow font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          View Reviews
        </motion.button></Link>
        </motion.div>
    </motion.div>
  );
};

export default ReviewStats;
