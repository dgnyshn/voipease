import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Navbar from '../../components/Navbar';

export default function BlogPage() {
  const featuredPost = {
    title: "The Future of Business Communication: AI-Powered VoIP",
    excerpt: "Discover how artificial intelligence is revolutionizing VoIP systems and what it means for your business.",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80",
    category: "Technology"
  };

  const posts = [
    {
      title: "5 Ways to Optimize Your VoIP Call Quality",
      excerpt: "Learn the best practices for maintaining crystal-clear voice quality in your VoIP calls.",
      author: "Michael Chen",
      date: "March 12, 2024",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Tips & Tricks"
    },
    {
      title: "Remote Work and VoIP: A Perfect Match",
      excerpt: "How VoIP technology is enabling seamless communication for remote teams worldwide.",
      author: "Emily White",
      date: "March 10, 2024",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Remote Work"
    },
    {
      title: "Security Best Practices for VoIP Systems",
      excerpt: "Essential security measures to protect your VoIP communications from threats.",
      author: "David Brown",
      date: "March 8, 2024",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
      category: "Security"
    }
  ];

  return (
    <div>
      <Navbar />
      
      <div className="pt-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              VoipEase Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Insights, updates, and expert tips about VoIP technology and business communication.
            </p>
          </div>

          {/* Featured Post */}
          <div className="mb-16">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="md:flex">
                <div className="md:flex-shrink-0">
                  <img
                    className="h-48 w-full object-cover md:h-full md:w-96"
                    src={featuredPost.image}
                    alt={featuredPost.title}
                  />
                </div>
                <div className="p-8">
                  <span className="text-blue-600 text-sm font-semibold">{featuredPost.category}</span>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900">{featuredPost.title}</h2>
                  <p className="mt-4 text-gray-600">{featuredPost.excerpt}</p>
                  <div className="mt-6 flex items-center">
                    <div className="flex items-center">
                      <User className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-500">{featuredPost.author}</span>
                    </div>
                    <div className="ml-6 flex items-center">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="ml-2 text-sm text-gray-500">{featuredPost.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Posts */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Recent Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <div key={post.title} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <img
                    className="h-48 w-full object-cover"
                    src={post.image}
                    alt={post.title}
                  />
                  <div className="p-6">
                    <span className="text-blue-600 text-sm font-semibold">{post.category}</span>
                    <h3 className="mt-2 text-xl font-bold text-gray-900">{post.title}</h3>
                    <p className="mt-3 text-gray-600">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {post.date}
                      </div>
                    </div>
                    <button className="mt-4 flex items-center text-blue-600 hover:text-blue-700">
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}