import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useAuth } from '../../Store/auth';
import { toast } from 'react-toastify';
import BlogModal from './BlogModal';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Camera, XCircle } from 'lucide-react';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');
  const [preview, setPreview] = useState(null);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [hasBlogged, setHasBlogged] = useState(false);
  const [imageFile, setImageFile] = useState(null); // Store selected image
  const { user } = useAuth();
  const loggedInUsername = user?.username || '';
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/blog`);
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);

          const userBlog = data.find((blog) => blog.username === loggedInUsername);
          setHasBlogged(!!userBlog);
  
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [loggedInUsername]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Save the file
      setPreview(URL.createObjectURL(file)); // Generate preview
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setPreview(null);
  };  


  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
  
    if (!loggedInUsername) {
      toast.error('Please login to submit a blog');
      return;
    }
  
    if (!title || !content) {
      toast.error('Title and Content are required');
      return;
    }
  
    const formData = new FormData();
    formData.append('username', loggedInUsername);
    formData.append('title', title);
    formData.append('content', content);
    formData.append('date', format(new Date(), 'dd MMM yyyy'));
    formData.append('time', format(new Date(), 'hh:mm a'));
  
    if (imageFile) {
      formData.append('image', imageFile); // Add image if selected
    }
  
    try {
      const response = await fetch(`${BASE_URL}/blog`, {
        method: 'POST',
        body: formData, // Use FormData to handle text + image
      });
  
      if (response.ok) {
        toast.success('Blog Posted Successfully');
        setTimeout(() => {
          window.location.reload();
        }, 500);
  
        // Instead of window.location.reload(), update blogs directly
        const newBlog = {
          id: new Date().getTime(),
          username: loggedInUsername,
          title,
          content,
          date: format(new Date(), 'dd MMM yyyy'),
          time: format(new Date(), 'hh:mm a'),
          image: preview, // Keep the preview image
        };
  
        setBlogs([newBlog, ...blogs]); // Add new blog to state
        setTitle('');
        setContent('');
        setImageFile(null);
        setPreview(null);
      } else {
        toast.error('Failed to post blog');
      }
    } catch (error) {
      toast.error('Blog Not Posted');
      console.error('Error:', error);
    }
  };
  

  const openEditModal = (blogId, existingTitle, existingContent) => {
    setCurrentBlogId(blogId);
    setModalTitle(existingTitle);
    setModalContent(existingContent);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBlogUpdate = async () => {
    if (!modalTitle || !modalContent) {
      toast.error('Title and Content are required');
      return;
    }

    const updatedBlog = {
      id: currentBlogId,
      username: loggedInUsername,
      title: modalTitle,
      content: modalContent,
      date: format(new Date(), 'dd MMM yyyy'),
      time: format(new Date(), 'hh:mm a'),
    };

    const updatedBlogs = blogs.map((blog) =>
      blog.id === currentBlogId ? updatedBlog : blog
    );
    setBlogs(updatedBlogs);
    closeModal();

    try {
      const response = await fetch(`${BASE_URL}/blog/${currentBlogId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBlog),
      });

      if (response.ok) {
        toast.success('Blog Updated Successfully');
      } else {
        toast.error('Failed to update blog');
      }
    } catch (error) {
      toast.error('Error while updating blog');
      console.error(error);
    }
  };

  return (
    <div className="p-6 mt-10 bg-[#C6B198] rounded-3xl sm:rounded-lg shadow-lg w-full max-w-lg mx-auto flex flex-col justify-center items-center" data-aos="fade-down">
    {hasBlogged ? (
      <h2 className="text-2xl font-bold text-gray-800 text-center" data-aos="fade-up">Your Blog</h2>
    ) : (
      <div className="max-w-2xl mx-auto p-6 bg-[#C6B198] rounded-3xl shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create a Blog Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative w-full flex flex-col items-center">
            {preview ? (
              <div className="relative w-48 h-48 rounded-lg overflow-hidden border-2 border-gray-500">
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={removeImage}
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

          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 bg-gray-700 text-gray-300 placeholder-gray-400 rounded-lg"
          />
          <textarea
            placeholder="Write your blog content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 bg-gray-700 text-gray-300 placeholder-gray-400 rounded-lg h-32"
          />
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#796855] text-gray-300 font-semibold py-2 px-8 rounded hover:bg-[#3d3428]"
            >
              Post Blog
            </button>
          </div>
        </form>
      </div>
    )}

    <BlogModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} blog={currentBlog} setBlogs={setBlogs} />
  </div>
);
};

export default BlogPage;
