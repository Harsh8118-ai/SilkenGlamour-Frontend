import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useAuth } from '../../Store/auth';
import { toast } from 'react-toastify';
import ReviewModal from './ReviewModal';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ReviewComponent = () => {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReviewId, setCurrentReviewId] = useState(null);
  const [modalComment, setModalComment] = useState('');
  const [modalRating, setModalRating] = useState(0);
  const [hasReviewed, setHasReviewed] = useState(false);

  const { user } = useAuth();
  const loggedInUsername = user?.username || '';
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchReviews = async () => {
      try {
        const response = await fetch(`${BASE_URL}/form/review`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);

          const userReview = data.find((review) => review.username === loggedInUsername);
          if (userReview) {
            setHasReviewed(true);
          }
          
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [loggedInUsername]);

  const handleReviewSubmit = async () => {
    if (!loggedInUsername) {
      toast.error('Please login to submit a review');
      return;
    }

    if (rating === 0) {
      toast.error('Please give the Rating');
      return;
    }

    if (!comment) {
      toast.error('Please Enter your Comments');
      return;
    }

    const newReview = {
      id: new Date().getTime(), // Generates unique ID
      username: loggedInUsername,
      comment,
      rating,
      date: format(new Date(), 'dd MMM yyyy'),
      time: format(new Date(), 'hh:mm a'),
    };

    setReviews([newReview, ...reviews]);
    setComment('');
    setRating(0);

    try {
      const response = await fetch(`${BASE_URL}/form/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success('Review Posted Successfully');
        setTimeout(() => {
          window.location.reload();  //Refresh the page after success
        }, 500);
      }
    } catch (error) {
      toast.error('Review Not Posted');
      console.error('Error:', error);
    }
  };

  const getEmoji = () => {
    if (rating === 0) return '';
    if (rating > 3) return '😊';
    if (rating === 3) return '😐';
    return '😞';
  };

  const openEditModal = (reviewId, existingComment, existingRating) => {
    setCurrentReviewId(reviewId);
    setModalComment(existingComment);
    setModalRating(existingRating);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleReviewUpdate = async () => {
    if (!modalComment) {
      toast.error('Please enter a comment');
      return;
    }

    if (modalRating === 0) {
      toast.error('Please provide a rating');
      return;
    }

    const updatedReview = {
      id: currentReviewId,
      username: loggedInUsername,
      comment: modalComment,
      rating: modalRating,
      date: format(new Date(), 'dd MMM yyyy'),
      time: format(new Date(), 'hh:mm a'),
    };

    const updatedReviews = reviews.map((review) =>
      review.id === currentReviewId ? updatedReview : review
    );
    setReviews(updatedReviews);
    closeModal();

    try {
      const response = await fetch(`${BASE_URL}/form/review/${currentReviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedReview),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success('Review Updated Successfully');
      } else {
        toast.error('Failed to update review');
      }
    } catch (error) {
      toast.error('Error while updating review');
      console.error(error);
    }
  };

  return (
    <>
    <div className="p-6 mt-10 bg-[#C6B198] rounded-3xl sm:rounded-lg shadow-lg w-full max-w-lg mx-auto flex flex-col justify-center items-center" data-aos="fade-down">
      {hasReviewed ? (
        <h2 className="text-2xl -mb-8 font-bold text-gray-800 text-center" data-aos="fade-up">Your Review</h2>
      ) : (
        <>
      {/* Rating Selection */}
      <div className="flex" data-aos="fade-left">
        <div className={`flex items-center mb-4 ${rating ? 'mr-10' : 'mr-0'}`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className="text-3xl sm:text-4xl lg:ml-2 ml-1"
            >
              <svg
              className='transition duration-300 ease-in-out transform hover:scale-125'
                width={`${star <= rating ? '23px' : '20px'}`}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 47.94 47.94"
              >
                <path
                  fill={`${star <= rating ? '#796855' : '#475569'}`}
                  d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 
            c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 
            c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 
            c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 
            c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 
            C22.602,0.567,25.338,0.567,26.285,2.486z"
                ></path>
              </svg>
            </button>
          ))}
        </div>

        {/* Star Count and Emoji */}
        <div className="flex items-center mb-4">
          {rating > 0 && (
            <span className="ml-2 text-lg font-semibold text-gray-800">
              {rating} Star{rating > 1 && 's'}
            </span>
          )}
          <span className="ml-2 text-3xl">{getEmoji()}</span>
        </div>
      </div>
      <span className="text-xs -mt-2.5 mb-2.5 font-bold font-Helvetica" data-aos="fade-up">Give your Rating</span>

      {/* Comment Input */}
      <textarea
      data-aos="fade-right  "
        placeholder="Write your review here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 mb-4 text-gray-300 bg-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-BGColorYellow transition duration-300 ease-in-out transform hover:scale-105 h-24"
      />

      <button
        onClick={handleReviewSubmit}
        className="w-full bg-[#796855] text-gray-300 font-semibold py-2 rounded hover:bg-[#3d3428]"
        data-aos="fade-up">
        Submit Review
      </button>
      </>
      )}

      <div className="reviews-page">
        <ReviewModal reviews={reviews} openEditModal={openEditModal} />
      </div>

      
      
    </div>

    </>
    
  );
};

export default ReviewComponent;
