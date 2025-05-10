"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaUser, FaTag, FaSearch, FaArrowRight } from 'react-icons/fa';

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Mock blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Quantum Computing's Impact on Halal Supply Chain Security",
      excerpt: "Explore how quantum computing is revolutionizing security protocols in halal certification and supply chain verification.",
      image: "/images/blog/quantum-computing.jpg",
      date: "May 5, 2025",
      author: "Dr. Aisha Rahman",
      category: "technology",
      tags: ["quantum computing", "security", "blockchain"],
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Neural Interfaces: The Future of Halal Product Verification",
      excerpt: "How non-invasive neural interfaces are changing the way halal certifiers verify product compliance and authenticity.",
      image: "/images/blog/neural-interface.jpg",
      date: "April 28, 2025",
      author: "Mohammed Al-Farsi",
      category: "innovation",
      tags: ["neural interface", "certification", "technology"],
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "Global Halal Standards Harmonization Initiative Launches",
      excerpt: "A new international effort aims to create unified halal standards across 120+ countries using blockchain verification.",
      image: "/images/blog/global-standards.jpg",
      date: "April 15, 2025",
      author: "Fatima Zaidi",
      category: "standards",
      tags: ["standards", "global", "certification"],
      readTime: "5 min read"
    },
    {
      id: 4,
      title: "Carbon-Negative Halal Production: A Case Study",
      excerpt: "How Al-Baraka Farms achieved carbon-negative status while maintaining strict halal compliance in meat production.",
      image: "/images/blog/carbon-negative.jpg",
      date: "April 3, 2025",
      author: "Ibrahim Yusuf",
      category: "sustainability",
      tags: ["carbon capture", "sustainability", "case study"],
      readTime: "10 min read"
    },
    {
      id: 5,
      title: "Metaverse Halal Education Center Welcomes 10,000 Students",
      excerpt: "Our virtual education center has trained 10,000 halal certification professionals in its first quarter of operation.",
      image: "/images/blog/metaverse-education.jpg",
      date: "March 22, 2025",
      author: "Zainab Ahmed",
      category: "education",
      tags: ["metaverse", "education", "training"],
      readTime: "4 min read"
    },
    {
      id: 6,
      title: "AI Agents Detect Fraudulent Certification Attempt in Real-Time",
      excerpt: "How our AI agent system identified and prevented a sophisticated attempt at halal certification fraud.",
      image: "/images/blog/ai-fraud-detection.jpg",
      date: "March 10, 2025",
      author: "Dr. Hassan Malik",
      category: "security",
      tags: ["AI", "fraud detection", "security"],
      readTime: "7 min read"
    }
  ];
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'technology', name: 'Technology' },
    { id: 'innovation', name: 'Innovation' },
    { id: 'standards', name: 'Standards & Compliance' },
    { id: 'sustainability', name: 'Sustainability' },
    { id: 'education', name: 'Education' },
    { id: 'security', name: 'Security' }
  ];
  
  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">HalalChain Insights</h1>
          <p className="text-xl max-w-3xl mx-auto">
            The latest news, research, and innovations in halal certification, blockchain technology, and sustainable supply chains.
          </p>
        </div>
      </section>
      
      {/* Search and Filter */}
      <section className="bg-white py-8 shadow-md">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/2 relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <div className="w-full md:w-auto">
              <select
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Post */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto">
                <Image
                  src="/images/blog/featured-post.jpg"
                  alt="Featured Post"
                  fill
                  style={{objectFit: "cover"}}
                />
              </div>
              <div className="p-8">
                <div className="flex items-center mb-4">
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">FEATURED</span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-gray-500 text-sm flex items-center">
                    <FaCalendarAlt className="mr-1" /> May 10, 2025
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-4">The Evolution of Halal Certification: From Paper to Quantum-Secured Blockchain</h2>
                <p className="text-gray-600 mb-6">
                  A comprehensive look at how halal certification has transformed over the decades, culminating in today's 
                  quantum-secured blockchain systems that ensure unprecedented levels of trust and transparency.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden relative mr-3">
                      <Image
                        src="/images/authors/ahmad-khan.jpg"
                        alt="Ahmad Khan"
                        fill
                        style={{objectFit: "cover"}}
                      />
                    </div>
                    <span className="text-gray-700">Ahmad Khan, CEO</span>
                  </div>
                  <Link href="/blog/evolution-of-halal-certification" className="text-green-600 hover:text-green-700 font-medium flex items-center">
                    Read Article <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Blog Posts Grid */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
          
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="relative h-48">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      style={{objectFit: "cover"}}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500 flex items-center">
                        <FaCalendarAlt className="mr-1" /> {post.date}
                      </span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm text-gray-600 flex items-center">
                          <FaUser className="mr-1" /> {post.author}
                        </span>
                      </div>
                      <Link href={`/blog/${post.id}`} className="text-green-600 hover:text-green-700 font-medium">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles found matching your search criteria.</p>
              <button 
                onClick={() => {setSearchQuery(''); setSelectedCategory('all');}}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-green-700 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with HalalChain Insights</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest articles, research papers, and industry updates directly to your inbox.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            <button
              type="submit"
              className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 text-sm text-green-200">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </main>
  );
}