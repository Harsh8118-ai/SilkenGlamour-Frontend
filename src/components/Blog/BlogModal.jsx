import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Camera, XCircle } from 'lucide-react';
import { useAuth } from '../../Store/auth';

const BlogModal = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({ _id: '', title: '', content: '', image: '' });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null); // Store preview image
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const { token, user } = useAuth();
  const loggedInUsername = user?.username || '';

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/blog`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBlogs(data.sort((a, b) => (a.username === loggedInUsername ? -1 : 1)));
        } else {
          toast.error('Failed to fetch blogs');
        }
      } catch (error) {
        toast.error('Error fetching blogs');
      }
    };
    fetchBlogs();
  }, [BASE_URL, token, loggedInUsername]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file)); // Show new image preview
    }
  };

  const handleEditClick = (blog) => {
    if (blog.username === loggedInUsername) {
      setCurrentBlog({ ...blog });
      setPreview(blog.image); // Show existing image when editing
      setIsModalOpen(true);
    }
  };

  const handleBlogUpdate = async () => {
    if (!currentBlog.title || !currentBlog.content) {
      toast.error('Title and content are required');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', currentBlog.title);
      formData.append('content', currentBlog.content);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch(`${BASE_URL}/blog/${currentBlog._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        toast.success('Blog updated successfully');
        setBlogs((prevBlogs) =>
          prevBlogs.map((blog) => (blog._id === currentBlog._id ? updatedBlog : blog))
        );
        closeModal();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error('Failed to update blog');
      }
    } catch (error) {
      toast.error('Error updating blog');
    }
  };

  const handleDeleteClick = async (blogId) => {
    try {
      const response = await fetch(`${BASE_URL}/blog/${blogId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        toast.success('Blog deleted successfully');
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== blogId));
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        toast.error('Failed to delete blog');
      }
    } catch (error) {
      toast.error('Error deleting blog');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setImageFile(null);
    setPreview(null); // Reset preview when closing
  };

  return (
    <div className="px-7 mt-10 bg-[#C6B198] rounded-3xl shadow-lg w-full max-w-lg mx-auto flex flex-col justify-center items-center">
      {blogs.length > 0 ? (
        blogs
          .filter((blog) => blog.username === loggedInUsername)
          .map((blog) => (
            <div key={blog._id} className="py-4 bg-LightBGColor rounded-lg shadow mt-4 w-full px-4">
              {blog.image && <img src={blog.image} alt="Blog" className="mt-2 w-full h-full object-cover rounded-lg" />}
              <div className='flex justify-center items-center flex-col'>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 text-center">{blog.title}</h3>
                <p className="mt-2 text-black text-xs font-semibold font-">By {blog.username || 'Unknown'} • {new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>

              <p className="text-gray-500 mt-2">{blog.content.slice(0, 100)}...</p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <button onClick={() => handleEditClick(blog)} className="bg-[#796855] text-white px-4 py-2 rounded-lg">Edit</button>
                <button onClick={() => handleDeleteClick(blog._id)} className="bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
              </div>
            </div>
          ))
      ) : (
        <span></span>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-LightBGColor p-6 rounded-lg w-96">
            <h3 className="text-2xl font-bold text-center mb-4">Edit Your Blog</h3>

            {/* File Input for New Image */}
            <div className="relative w-full flex flex-col items-center mb-3">
              {preview ? (
                <div className="relative w-48 h-48 rounded-lg overflow-hidden border-2 border-gray-500">
                  <img src={preview} alt="Blog Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setPreview(null)}
                    className="absolute top-2 right-2 bg-red-700 bg-opacity-50 text-white p-1 rounded-full"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-48 h-48 border-2 border-gray-500 border-dashed rounded-lg cursor-pointer transition-all duration-300 hover:border-gray-300 hover:bg-gray-700 hover:text-white">
                  <Camera size={40} className="text-gray-600 mb-2 transition-all duration-300 group-hover:text-white" />
                  <span className="text-gray-600 transition-all duration-300 group-hover:text-white">Upload Image</span>
                  <input type="file" className="hidden" onChange={handleImageChange} />
                </label>
              )}
            </div>

            {/* Input for New Title & Content */}
            <input
              type="text"
              value={currentBlog.title}
              onChange={(e) => setCurrentBlog({ ...currentBlog, title: e.target.value })}
              className="w-full p-2 mb-4 text-gray-300 bg-gray-700 rounded-lg"
              placeholder="Title"
            />
            <textarea
              value={currentBlog.content}
              onChange={(e) => setCurrentBlog({ ...currentBlog, content: e.target.value })}
              className="w-full p-2 mb-4 text-gray-300 bg-gray-700 rounded-lg h-24"
              placeholder="Content"
            />

            <div className="flex justify-between">
              <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700">Cancel</button>
              <button onClick={handleBlogUpdate} className="bg-BGColorYellow text-white px-4 py-2 rounded-lg hover:bg-MainBGColorYellow">Update Blog</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogModal;
