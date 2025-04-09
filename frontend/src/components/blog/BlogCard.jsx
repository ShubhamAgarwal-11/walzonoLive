"use client"

import { motion } from "framer-motion"
import { Calendar, Tag } from "lucide-react"

export default function BlogCard({ blog, onClick }) {
  return (
    <motion.div
      className="bg-white text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={blog.image || "/placeholder.svg"}
          alt={blog.title}
          className="object-cover transition-transform duration-500 hover:scale-110"
          style={{
            position: 'absolute',
            height: '100%',
            width: '100%',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            objectFit: 'cover'
          }}
          loading="eager"
        />
        <div className="absolute top-4 left-4 bg-black text-white text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
          <Tag size={12} />
          <span>{blog.tag}</span>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center text-gray-500 text-black text-sm mb-3">
          <Calendar size={14} className="mr-1 text-black" />
          <time dateTime={blog.date} className="text-black">{blog.date}</time>
        </div>
        <h3 className="text-xl font-bold mb-3 text-black">{blog.title}</h3>
        <p className="text-gray-600 text-black mb-4 flex-1">{blog.excerpt}</p>
        <button className="text-black font-medium flex items-center group">
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </motion.div>
  )
}