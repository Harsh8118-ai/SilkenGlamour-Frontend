import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../Store/auth';

const ReviewModal = () => {
  const [reviews, setReviews] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState({ _id: '', comment: '', rating: 0 });
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const { token, user } = useAuth();
  const loggedInUsername = user?.username || '';

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${BASE_URL}/form/review`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setReviews(
            data.sort((a, b) => (a.username === loggedInUsername ? -1 : 1))
          );
        } else {
          toast.error('Failed to fetch reviews');
        }
      } catch (error) {
        toast.error('Error fetching reviews');
      }
    };
    fetchReviews();
  }, [BASE_URL, token, loggedInUsername]);

  const handleEditClick = (review) => {
    if (review.username === loggedInUsername) {
      setCurrentReview({ ...review });
      setIsModalOpen(true);
    }
  };

  const handleReviewUpdate = async () => {
    const updatedReview = { ...currentReview, comment: currentReview.comment.trim() };
    if (!updatedReview.comment || updatedReview.rating === 0) {
      toast.error('Please provide valid comments and rating');
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/form/review/${updatedReview._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedReview),
      });
      if (response.ok) {
        toast.success('Review updated successfully');
        setReviews((prevReviews) =>
          prevReviews.map((review) =>
            review._id === updatedReview._id ? updatedReview : review
          )
        );
        closeModal();
      } else {
        toast.error('Failed to update review');
      }
    } catch (error) {
      toast.error('Error updating review');
    }
  };

  const handleDeleteClick = async (reviewId) => {
    try {
      const response = await fetch(`${BASE_URL}/form/review/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        toast.success('Review deleted successfully');
        setReviews((prevReviews) => prevReviews.filter((review) => review._id !== reviewId));
        setTimeout(() => {
          window.location.reload();  //Refresh the page after success
        }, 500);
      } else {
        toast.error('Failed to delete review');
      }
    } catch (error) {
      toast.error('Error deleting review');
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="px-7  mt-10 bg-[#C6B198] rounded-3xl sm:rounded-lg shadow-lg w-full max-w-lg mx-auto flex flex-col justify-center items-center">
      

      {reviews.length > 0 ? (
        reviews
          .filter((review) => review.username === loggedInUsername) // Filter reviews to show only the logged-in user's reviews
          .map((review) => (
            <div key={review._id} className={`py-4 bg-LightBGColor rounded-lg shadow mt-4 w-full m-10  ${review.username === loggedInUsername ? 'border-2 border-[#796855]' : ''}`}>
              <div className="flex items-baseline gap-8 sm:gap-16 justify-between px-2 sm:px-4">
                <h3 className="text-lg font-semibold text-gray-800 left-0">{review.username}</h3>
                <div className="text-sm text-gray-500">{review.date} at {review.time}</div>
              </div>
              <div className="flex items-center text-[#796855] text-xl mt-2 px-2 sm:px-4">
                {Array(Number(review.rating))
                  .fill()
                  .map((_, i) => (
                    <span key={i}>
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
                  </svg></span>
                  ))}
              </div>
              <p className="text-gray-700 mt-2 px-2 sm:px-4">{review.comment}</p>

              <div className='flex items-center justify-center gap-4'>
              {review.username === loggedInUsername && (
                <>
                  <button onClick={() => handleEditClick(review)} className="text-gray-300 mt-2 text-sm sm:text-lg bg-[#796855] px-10 rounded-sm font-semibold hover:bg-[#3d3428]">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(review._id)} className="text-gray-300 mt-2 text-sm sm:text-lg bg-red-600 px-10 rounded-sm font-semibold hover:bg-red-800">
                    Delete
                  </button>
                </>
              )}
              </div>
            </div>
          ))
      ) : (
        <p className="text-gray-700">No reviews yet.</p>
      )}


      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-2xl font-bold text-center mb-4">Edit Your Review</h3>

            <div className="flex mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} onClick={() => setCurrentReview({ ...currentReview, rating: star })} className="text-3xl sm:text-4xl lg:ml-2 ml-1">
                  <svg width={`${star <= currentReview.rating ? '23px' : '20px'}`} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.94 47.94">
                    <path
                      fill={`${star <= currentReview.rating ? '#796855' : '#475569'}`}
                      d="M26.285,2.486l5.407,10.956c0.376,0.762,1.103,1.29,1.944,1.412l12.091,1.757 c2.118,0.308,2.963,2.91,1.431,4.403l-8.749,8.528c-0.608,0.593-0.886,1.448-0.742,2.285l2.065,12.042 c0.362,2.109-1.852,3.717-3.746,2.722l-10.814-5.685c-0.752-0.395-1.651-0.395-2.403,0l-10.814,5.685 c-1.894,0.996-4.108-0.613-3.746-2.722l2.065-12.042c0.144-0.837-0.134-1.692-0.742-2.285l-8.749-8.528 c-1.532-1.494-0.687-4.096,1.431-4.403l12.091-1.757c0.841-0.122,1.568-0.65,1.944-1.412l5.407-10.956 C22.602,0.567,25.338,0.567,26.285,2.486z"
                    ></path>
                  </svg>
                </button>
              ))}
            </div>

            <textarea
              value={currentReview.comment}
              onChange={(e) => setCurrentReview({ ...currentReview, comment: e.target.value })}
              className="w-full p-2 mb-4 text-gray-700 bg-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-BGColorYellow transition duration-300 ease-in-out transform hover:scale-105 h-24"
            />

            <div className="flex justify-between">
              <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-lg">
                Cancel
              </button>
              <button onClick={handleReviewUpdate} className="bg-[#796855] text-gray-300 px-4 py-2 rounded-lg">
                Update Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewModal;
