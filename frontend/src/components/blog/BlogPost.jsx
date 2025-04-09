"use client"

import { motion } from "framer-motion"
import { Calendar, Tag, ArrowLeft } from "lucide-react"

export default function BlogPost({ blog, onBackClick }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <button onClick={onBackClick} className="flex items-center text-black my-6 hover:underline">
        <ArrowLeft size={16} className="mr-1 text-black" />
        Back to all blogs
      </button>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="relative h-[400px] w-full mb-8 rounded-xl overflow-hidden">
          <img
            src={blog.image || "/placeholder.svg"}
            alt={blog.title}
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              left: 0,
              top: 0
            }}
            loading="eager"
          />
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gray-300 text-black px-3 py-1 rounded-full flex items-center gap-1">
            <Tag size={14} />
            <span>{blog.tag}</span>
          </div>
          <div className="flex items-center text-black bg-gray-300 px-3 py-1 rounded-full">
            <Calendar size={14} className="mr-1" />
            <time dateTime={blog.date}>{blog.date}</time>
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-black">{blog.title}</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed">{blog.content}</p>

          {/* In a real app, you would render the full blog content here */}
          <p className="mt-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl
            aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl
            aliquam nisl, eget aliquam nisl nisl sit amet nisl.
          </p>

          <p className="mt-6">
            Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed
            euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}