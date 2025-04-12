"use client"

import { useState, useEffect } from "react"
import BlogCard from './BlogCard'
import BlogPost from "./BlogPost"
import { motion } from "framer-motion"
import axios from "axios"
import { BLOG_API_END_POINT } from "../../utils/constent"

const mockBlogs = [
  {
    id: 1,
    title: "Getting Started with React",
    excerpt:
      "Learn the basics of React and how to create your first component. This guide will walk you through the essential concepts.",
    content:
      "React is a JavaScript library for building user interfaces. It's declarative, efficient, and flexible. With React, you can compose complex UIs from small, isolated pieces of code called components. React has several different kinds of components, but we'll start with React.Component subclasses. Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called \"props\") and return React elements describing what should appear on the screen.",
    image: "https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg", // Beauty products
    tag: "Development",
    date: "2023-10-15",
  },
  {
    id: 2,
    title: "The Future of AI in Web Development",
    excerpt:
      "Explore how artificial intelligence is transforming the way we build and interact with websites and applications.",
    content:
      "Artificial Intelligence is rapidly changing the landscape of web development. From automated code generation to intelligent user interfaces, AI is making it easier for developers to create sophisticated applications with less effort. In this article, we explore the various ways AI is being integrated into web development workflows and how it's likely to evolve in the coming years. We'll look at tools like GitHub Copilot, AI-powered design systems, and how machine learning models can be used to create more personalized user experiences.",
    image: "https://images.pexels.com/photos/6621337/pexels-photo-6621337.jpeg", // Skincare routine
    tag: "Technology",
    date: "2023-10-10",
  },
  {
    id: 3,
    title: "Mastering CSS Grid Layout",
    excerpt: "A comprehensive guide to using CSS Grid for creating complex, responsive layouts with ease.",
    content:
      "CSS Grid Layout is a two-dimensional layout system designed specifically for the web. It allows you to organize content into rows and columns and has transformed the way we create web layouts. In this comprehensive guide, we'll explore everything from the basics of setting up a grid to advanced techniques for creating complex, responsive layouts. You'll learn how to use grid template areas, how to create responsive designs without media queries, and how to combine Grid with Flexbox for even more powerful layouts.",
    image: "https://images.pexels.com/photos/3998009/pexels-photo-3998009.jpeg", // Makeup palette
    tag: "Design",
    date: "2023-10-05",
  },
  {
    id: 4,
    title: "Understanding TypeScript Generics",
    excerpt: "Dive deep into TypeScript generics and learn how they can make your code more reusable and type-safe.",
    content:
      "TypeScript generics provide a way to create reusable components that can work with a variety of types rather than a single one. This is similar to generics in other languages like Java or C#. In this article, we'll explore how generics work in TypeScript, why they're useful, and how to use them effectively in your code. We'll cover basic generic functions and interfaces, constraints, default types, and real-world examples of how generics can improve your code's flexibility and type safety.",
    image: "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg", // Skincare products
    tag: "Development",
    date: "2023-09-28",
  },
  {
    id: 5,
    title: "Building Accessible Web Applications",
    excerpt: "Learn the principles and practices for creating web applications that are accessible to all users.",
    content:
      "Web accessibility is about creating websites that can be used by everyone, including people with disabilities. In this guide, we'll cover the fundamental principles of web accessibility and provide practical tips for implementing them in your projects. We'll discuss semantic HTML, keyboard navigation, ARIA attributes, color contrast, and how to test your applications for accessibility compliance. By following these practices, you can ensure your web applications are usable by as many people as possible, regardless of their abilities or disabilities.",
    image: "https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg", // Makeup brushes
    tag: "Accessibility",
    date: "2023-09-20",
  },
  {
    id: 6,
    title: "Introduction to Next.js 13",
    excerpt:
      "Explore the new features and improvements in Next.js 13, including the new App Router and Server Components.",
    content:
      "Next.js 13 introduces several groundbreaking features that change how we build React applications. The new App Router provides a more intuitive way to create routes and layouts, while Server Components allow you to render components on the server for improved performance and SEO. In this article, we'll dive into these new features, explain how they work, and show you how to migrate your existing Next.js applications to take advantage of these improvements. We'll also discuss the performance benefits and potential challenges you might encounter when adopting these new patterns.",
    image: "https://images.pexels.com/photos/3997373/pexels-photo-3997373.jpeg", // Makeup studio
    tag: "Development",
    date: "2023-09-15",
  },
];


export default function BlogList() {
  const [blogs, setBlogs] = useState([])
  const [selectedBlog, setSelectedBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BLOG_API_END_POINT}/getAllBlogs`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        })
        if(response.data.success){
          setBlogs(response.data.blogs)
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
        return error;
      }
    }
    
    fetchBlogs()
  }, [])

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleBackClick = () => {
    setSelectedBlog(null)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  if (selectedBlog) {
    return <BlogPost blog={selectedBlog} onBackClick={handleBackClick} />
  }

  return (

    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {blogs.map((blog, index) => (
        <motion.div
        key={blog.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        whileHover={{ y: -5 }}
        >
        <BlogCard blog={blog} onClick={() => handleBlogClick(blog)} />
        </motion.div>
    ))}
      </div>
    </main>
  )
}