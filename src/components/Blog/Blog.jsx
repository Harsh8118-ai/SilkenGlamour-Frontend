import React from 'react'
import BlogPage from './BlogPage';
import BlogView from './BlogView';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';



export default function Blog() {
  return (
    <div className="bg-BGColorYellow p-6">

      {/* Blog Section  */}
      {/* View Reviews Button */}
      <motion.div className="flex justify-center mt-6">
        <Link to="/review">
        <motion.button
          className="px-6 py-3 bg-gradient-to-r from-[#56442f] via-[#6e5d49] to-[#56442f] text-MainBGColorYellow font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          View Reviews
        </motion.button></Link>
        </motion.div>
      <BlogPage />
      <BlogView />

    </div>
  );
}
