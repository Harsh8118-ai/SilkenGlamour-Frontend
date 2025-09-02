import { useState, useEffect } from "react";
import axios from "axios";

const BlogView = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const blogsPerPage = 5;

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blog`);
        setBlogs(response.data);
        setFilteredBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  const categories = ["All", ...new Set(blogs.map((blog) => blog.category))];

  useEffect(() => {
    let filtered = blogs;
    if (selectedCategory !== "All") {
      filtered = filtered.filter((blog) => blog.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredBlogs(filtered);
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, blogs]);

  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen mt-16">
      <h2 className="text-2xl font-bold mb-4 text-center text-LightBGColor">Blog Posts</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded-md mb-10 bg-LightBGColor "
      />



      {/* Blog List */}

      {/* Web View */}
      <div className="hidden sm:block">
        {currentBlogs.map((blog) => (
          <div
            key={blog._id}
            className="grid grid-cols-3 gap-4 border p-4 rounded-lg mb-4 shadow-lg cursor-pointer"
            onClick={() => setSelectedBlog(blog)}
          >
            {/* Left: Image (30% width) */}
            {blog.image && (
              <div className="col-span-1">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            )}

            {/* Right: Title, username, Date, Snippet (70% width) */}
            <div className="col-span-2">
              <h3 className="text-xl font-bold text-black ">{blog.title}</h3>
              <p className="text-black text-sm">By {blog.username || 'Unknown'} • {new Date(blog.createdAt).toLocaleDateString()}</p>
              <p className="text-gray-300 mt-2">{blog.content.slice(0, 200)}...</p>
            </div>
          </div>
        ))}</div>

      {/* Mobile View */}
      <div className="sm:hidden">
        {currentBlogs.map((blog) => (
          <div
            key={blog._id}
            className="border p-4 rounded-lg mb-4 shadow-lg cursor-pointer flex flex-col sm:grid sm:grid-cols-3 sm:gap-4"
            onClick={() => setSelectedBlog(blog)}
          >
            {/* Image (Full width on mobile, left column on larger screens) */}
            {blog.image && (
              <div className="w-full sm:col-span-1 mb-3 sm:mb-0">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Text Content (Takes full width on mobile, right column on larger screens) */}
            <div className="sm:col-span-2 flex flex-col justify-center items-center">
              <h3 className="text-xl font-bold text-black  text-center">{blog.title}</h3>
              <p className="text-black text-sm font-Helvetica">
                By {blog.username || 'Unknown'} • {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mt-2 whitespace-pre-line">
                {blog.content.slice(0, 100)}...
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Blog Details */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="bg-LightBGColor p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedBlog(null)}
              className="absolute top-3 right-3  text-xl font-bold bg-red-600 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-300"
            >
              <span className="text-white">✖</span>
            </button>

            {/* Modal Content */}
            <div className="grid grid-cols-5 gap-4">
              {/* Left: Image (40% width) */}
              {selectedBlog.image && (
                <div className="col-span-2">
                  <img
                    src={selectedBlog.image}
                    alt={selectedBlog.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              )}

              {/* Right: Title, Author, Date (60% width) */}
              <div className="col-span-3">
                <h3 className="text-2xl font-bold mt-3">{selectedBlog.title}</h3>
                <p className="text-gray-500 text-sm font-bold mt-3">By {selectedBlog.username || 'Unknown'} • {new Date(selectedBlog.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Full Content Below */}
            <div className="mt-4">
              <p className="text-gray-800 font-semibold whitespace-pre-line">{selectedBlog.content}</p>
            </div>
          </div>
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center space-x-4 mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="font-semibold">{currentPage}</span>
        <button
          onClick={() => setCurrentPage((prev) => (indexOfLastBlog < filteredBlogs.length ? prev + 1 : prev))}
          disabled={indexOfLastBlog >= filteredBlogs.length}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BlogView;
