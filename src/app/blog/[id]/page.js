"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaUser, FaTag, FaArrowLeft, FaTwitter, FaFacebook, FaLinkedin, FaEnvelope } from 'react-icons/fa';

// Mock blog post data - in a real app, this would come from an API or CMS
const blogPosts = {
  '1': {
    id: 1,
    title: "Quantum Computing's Impact on Halal Supply Chain Security",
    content: `
      <p>The integration of quantum computing into halal supply chain security represents a paradigm shift in how we ensure the authenticity and integrity of halal products. As quantum computers become more powerful and accessible, their application in securing the halal supply chain is revolutionizing the industry.</p>
      
      <h2>The Quantum Security Challenge</h2>
      
      <p>Traditional cryptographic methods that secure today's blockchain-based certification systems will eventually become vulnerable to quantum attacks. This presents a significant challenge for halal certification, where the integrity of the verification process is paramount to maintaining consumer trust.</p>
      
      <p>At HalalChain, we've pioneered the implementation of post-quantum cryptographic algorithms that ensure all certifications remain secure even against the most advanced quantum computing attacks. This forward-thinking approach future-proofs the halal supply chain against emerging threats.</p>
      
      <h2>Quantum Pattern Recognition</h2>
      
      <p>Beyond security, quantum computing enables unprecedented pattern recognition capabilities across global supply chains. Our quantum-enhanced algorithms can identify complex patterns and detect anomalies that might indicate fraud or contamination with a level of precision previously impossible.</p>
      
      <p>For example, our system recently identified a subtle pattern of temperature fluctuations across multiple shipments that indicated potential contamination risk, despite each individual reading falling within acceptable parameters. This level of nuanced analysis is only possible with quantum computing power.</p>
      
      <h2>Quantum-Secured Global Network</h2>
      
      <p>Our quantum key distribution network now spans 37 countries, ensuring unhackable communication between all nodes in the HalalChain ecosystem. This global network uses quantum entanglement principles to create encryption keys that cannot be intercepted or duplicated without detection.</p>
      
      <p>The practical impact of this technology is significant: certification authorities, vendors, and regulators can share sensitive information with absolute confidence in its security, accelerating verification processes while maintaining rigorous standards.</p>
      
      <h2>Implementation Challenges and Solutions</h2>
      
      <p>Deploying quantum computing solutions across the halal supply chain has not been without challenges. The hardware requirements, specialized expertise needed, and integration with existing systems all presented significant hurdles.</p>
      
      <p>To address these challenges, we've developed a hybrid approach that allows organizations to benefit from quantum security without requiring direct access to quantum hardware. Our cloud-based quantum computing services provide the necessary computational power while our integration layer handles the complexity of quantum algorithms.</p>
      
      <h2>The Future of Quantum-Secured Halal Certification</h2>
      
      <p>Looking ahead, we anticipate quantum computing will enable even more advanced capabilities for halal certification and supply chain verification:</p>
      
      <ul>
        <li>Real-time molecular analysis through quantum sensors that can detect non-halal substances at previously undetectable concentrations</li>
        <li>Quantum simulation of complex supply chain scenarios to identify potential contamination risks before they occur</li>
        <li>Quantum machine learning algorithms that continuously improve fraud detection based on global certification data</li>
      </ul>
      
      <p>As these technologies mature, the gap between halal certification standards and verification capabilities will continue to narrow, ultimately creating a supply chain where consumers can have complete confidence in the authenticity of halal products.</p>
      
      <h2>Conclusion</h2>
      
      <p>Quantum computing is not just enhancing halal supply chain security—it's fundamentally transforming what's possible in terms of verification, transparency, and trust. At HalalChain, we're committed to remaining at the forefront of this technological revolution, ensuring that the integrity of halal certification continues to meet the highest standards in an increasingly complex global marketplace.</p>
    `,
    excerpt: "Explore how quantum computing is revolutionizing security protocols in halal certification and supply chain verification.",
    image: "/images/blog/quantum-computing.jpg",
    date: "May 5, 2025",
    author: "Dr. Aisha Rahman",
    authorTitle: "Chief Technology Officer, HalalChain",
    authorImage: "/images/authors/aisha-rahman.jpg",
    category: "technology",
    tags: ["quantum computing", "security", "blockchain"],
    readTime: "8 min read",
    relatedPosts: [2, 6, 3]
  },
  '2': {
    id: 2,
    title: "Neural Interfaces: The Future of Halal Product Verification",
    content: `
      <p>Neural interface technology is transforming how halal certifiers verify product compliance and authenticity. This groundbreaking approach allows for unprecedented levels of sensory verification while maintaining strict adherence to halal standards.</p>
      
      <h2>Beyond Visual Inspection</h2>
      
      <p>Traditional halal certification relies heavily on visual inspection and documentation review. While effective, these methods have inherent limitations in detecting subtle non-halal components or contamination. Neural interfaces overcome these limitations by enhancing the human sensory experience.</p>
      
      <p>Our non-invasive quantum-entangled photonic sensors allow halal inspectors to experience enhanced sensory perception, detecting molecular compositions and processing methods that would otherwise remain hidden.</p>
      
      <h2>The Science Behind Neural Verification</h2>
      
      <p>The technology works by creating a direct communication channel between specialized sensors and the inspector's sensory cortex. This connection allows for:</p>
      
      <ul>
        <li>Enhanced molecular composition sensing at parts-per-billion levels</li>
        <li>Detection of processing methods that may compromise halal status</li>
        <li>Identification of cross-contamination from non-halal sources</li>
        <li>Verification of slaughter methods through residual neural patterns</li>
      </ul>
      
      <p>Importantly, all of this is achieved without any invasive procedures. The neural interface uses quantum-entangled photonic sensors that require no implants or physical contact, ensuring both the safety of inspectors and compliance with ethical standards.</p>
      
      <h2>Training and Calibration</h2>
      
      <p>Becoming proficient with neural interface technology requires specialized training. Our certification program includes:</p>
      
      <ol>
        <li>Sensory calibration to establish baseline detection thresholds</li>
        <li>Pattern recognition training using known halal and non-halal samples</li>
        <li>Cross-reference verification with traditional testing methods</li>
        <li>Ongoing recalibration to maintain accuracy and sensitivity</li>
      </ol>
      
      <p>This comprehensive training ensures that inspectors can reliably interpret the enhanced sensory information provided by the neural interface.</p>
      
      <h2>Real-World Applications</h2>
      
      <p>The impact of neural interface technology on halal certification has been profound. In a recent case study, inspectors using our neural interface system identified trace amounts of alcohol-based processing agents in a product that had passed all conventional tests. This discovery prevented a potentially non-compliant product from receiving halal certification.</p>
      
      <p>Similarly, the technology has been instrumental in verifying the authenticity of halal meat products by confirming proper slaughter methods through residual neural patterns that conventional testing cannot detect.</p>
      
      <h2>Consumer Applications</h2>
      
      <p>Beyond certification, neural interface technology is also revolutionizing how consumers interact with halal products. Our consumer-grade interfaces allow shoppers to:</p>
      
      <ul>
        <li>Experience products through direct sensory simulation before purchase</li>
        <li>Verify halal status independently using personal neural devices</li>
        <li>Understand the origin and processing of products through enhanced perception</li>
      </ul>
      
      <p>This direct connection between consumers and products is creating unprecedented levels of transparency and trust in the halal marketplace.</p>
      
      <h2>Ethical Considerations</h2>
      
      <p>As with any advanced technology, neural interfaces raise important ethical questions. At HalalChain, we've established strict guidelines for their use:</p>
      
      <ul>
        <li>All neural patterns remain private and are never stored or transmitted</li>
        <li>Users maintain complete control over their neural interface experience</li>
        <li>Regular ethical reviews by independent Islamic scholars ensure compliance with religious principles</li>
        <li>All technology adheres to ISO 42001 Neural Safety Standards</li>
      </ul>
      
      <p>These safeguards ensure that neural interface technology enhances halal certification without compromising personal privacy or religious values.</p>
      
      <h2>The Future of Neural Verification</h2>
      
      <p>Looking ahead, we anticipate several exciting developments in neural interface technology for halal verification:</p>
      
      <ul>
        <li>Remote certification capabilities allowing inspectors to verify products from anywhere in the world</li>
        <li>Collective intelligence systems that combine insights from multiple inspectors</li>
        <li>Integration with quantum computing for even more precise molecular detection</li>
      </ul>
      
      <p>These advancements will further strengthen the integrity of halal certification, ensuring that consumers can have complete confidence in the products they purchase.</p>
      
      <h2>Conclusion</h2>
      
      <p>Neural interface technology represents a quantum leap forward in halal certification capabilities. By enhancing human sensory perception while maintaining strict ethical standards, this technology is setting new benchmarks for verification accuracy and consumer trust in the halal industry.</p>
    `,
    excerpt: "How non-invasive neural interfaces are changing the way halal certifiers verify product compliance and authenticity.",
    image: "/images/blog/neural-interface.jpg",
    date: "April 28, 2025",
    author: "Mohammed Al-Farsi",
    authorTitle: "Head of Neural Interface Research, HalalChain",
    authorImage: "/images/authors/mohammed-al-farsi.jpg",
    category: "innovation",
    tags: ["neural interface", "certification", "technology"],
    readTime: "6 min read",
    relatedPosts: [1, 5, 6]
  }
};

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchPost = () => {
      setLoading(true);
      
      // Simulate API delay
      setTimeout(() => {
        const postData = blogPosts[params.id];
        setPost(postData);
        
        if (postData && postData.relatedPosts) {
          const related = postData.relatedPosts
            .map(id => blogPosts[id])
            .filter(Boolean);
          setRelatedPosts(related);
        }
        
        setLoading(false);
      }, 300);
    };
    
    fetchPost();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
          <Link href="/blog" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-96">
        <div className="absolute inset-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            style={{objectFit: "cover"}}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="max-w-3xl">
            <Link href="/blog" className="inline-flex items-center text-white mb-4 hover:underline">
              <FaArrowLeft className="mr-2" />
              Back to Blog
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center text-white text-sm gap-4">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center">
                <FaUser className="mr-2" />
                <span>{post.author}</span>
              </div>
              <div>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Article Content */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-8">
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                ></div>
                
                {/* Tags */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <Link 
                        key={index} 
                        href={`/blog?tag=${tag}`}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* Share */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                  <div className="flex gap-3">
                    <a href="#" className="bg-[#1DA1F2] text-white p-2 rounded-full hover:opacity-80 transition-opacity">
                      <FaTwitter size={18} />
                    </a>
                    <a href="#" className="bg-[#4267B2] text-white p-2 rounded-full hover:opacity-80 transition-opacity">
                      <FaFacebook size={18} />
                    </a>
                    <a href="#" className="bg-[#0077B5] text-white p-2 rounded-full hover:opacity-80 transition-opacity">
                      <FaLinkedin size={18} />
                    </a>
                    <a href="#" className="bg-gray-700 text-white p-2 rounded-full hover:opacity-80 transition-opacity">
                      <FaEnvelope size={18} />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Author Bio */}
              <div className="bg-white rounded-xl shadow-md p-8 mt-8">
                <div className="flex items-start">
                  <div className="mr-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden relative">
                      <Image
                        src={post.authorImage}
                        alt={post.author}
                        fill
                        style={{objectFit: "cover"}}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{post.author}</h3>
                    <p className="text-gray-600 mb-3">{post.authorTitle}</p>
                    <p className="text-gray-700">
                      Expert in halal certification technologies with over 15 years of experience in the industry.
                      Specializes in the application of emerging technologies to enhance halal verification processes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              {/* Related Posts */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Related Articles</h3>
                <div className="space-y-6">
                  {relatedPosts.map(relatedPost => (
                    <div key={relatedPost.id} className="flex items-start">
                      <div className="w-20 h-20 relative rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          fill
                          style={{objectFit: "cover"}}
                        />
                      </div>
                      <div className="ml-4">
                        <Link 
                          href={`/blog/${relatedPost.id}`}
                          className="font-medium hover:text-green-600 line-clamp-2"
                        >
                          {relatedPost.title}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">{relatedPost.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Categories */}
              <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                <h3 className="text-xl font-bold mb-4">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/blog?category=technology" className="flex items-center justify-between hover:text-green-600">
                      <span>Technology</span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">12</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog?category=innovation" className="flex items-center justify-between hover:text-green-600">
                      <span>Innovation</span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">8</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog?category=standards" className="flex items-center justify-between hover:text-green-600">
                      <span>Standards & Compliance</span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">15</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog?category=sustainability" className="flex items-center justify-between hover:text-green-600">
                      <span>Sustainability</span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">7</span>
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog?category=education" className="flex items-center justify-between hover:text-green-600">
                      <span>Education</span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">5</span>
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Newsletter */}
              <div className="bg-green-700 rounded-xl shadow-md p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Subscribe to Our Newsletter</h3>
                <p className="mb-4">Get the latest articles and industry updates right to your inbox.</p>
                <form>
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-2 rounded-lg text-gray-800 mb-3"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-green-700 hover:bg-gray-100 font-bold py-2 rounded-lg transition duration-300"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}