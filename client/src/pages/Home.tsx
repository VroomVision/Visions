import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ProductCard from "@/components/ProductCard";
import FeatureCard from "@/components/FeatureCard";
import ReviewForm from "@/components/ReviewForm";
import Newsletter from "@/components/Newsletter";
import { mainFeatures, whyChooseUs } from "@/data/features";
import products from "@/data/products";
import { motion } from "framer-motion";

// Import car images for before/after slider
import beforeImage from "@assets/LUTS.jpg";
import afterImage from "@assets/LUT.jpg";

const Home: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Fetch products from the API (fallback to local data)
  const { data: apiProducts, isLoading, isError } = useQuery({
    queryKey: ['/api/products'],
    retry: 1,
    staleTime: 60000, // 1 minute
    refetchOnWindowFocus: false
  });

  // Use local data if API fails or is loading
  const displayProducts = products.map((p: any, idx: number) => {
    return p;
  });

  return (
    <>
      {/* Main background wrapper - fixed position to cover entire viewport */}
      <div className="fixed inset-0 z-[-1]">
        {/* Video background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-[1]"></div>
          <video 
            className="absolute top-0 left-0 min-w-full min-h-full object-cover opacity-80"
            autoPlay 
            muted 
            loop 
            playsInline
          >
            <source src="/videos/blackhole.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Stars overlays - three layers for parallax effect */}
        <div className="absolute inset-0 z-[2] stars stars-large opacity-70"></div>
        <div className="absolute inset-0 z-[2] stars opacity-60"></div>
        <div className="absolute inset-0 z-[2] stars stars-small opacity-60"></div>
      </div>
      
      {/* Hero Section */}
      <motion.section 
        className="relative pt-24 pb-20 overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Animated glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px] z-[4] hero-glow"></div>
        
        <div className="container relative mx-auto px-4 z-[5]">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-300">
              Transform Your Car Photography
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Professional color grading that turns ordinary car photos into showroom-quality imagery with just one click.
            </p>
          </div>
          
          {/* Image Comparison Slider */}
          <div className="max-w-2xl mx-auto">
            <BeforeAfterSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
              aspectRatio="video"
            />
            <p className="text-center mt-3 text-gray-400">
              Drag the slider to see the dramatic difference our premium LUTs make.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        className="py-16 bg-brand-dark" id="features"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mainFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* LUTs Section */}
      <motion.section 
        className="py-16 relative overflow-hidden" id="luts-section"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">LUTs Collection</h2>
            <Link to="/products" className="text-brand-purple hover:underline flex items-center">
              Show all <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(displayProducts as any[]).map((product: { slug: string; id: number; name: string; description: string; price: number; originalPrice: number | null; discount: number | null; features: string[] | null; category: string; compatibility: string[] | null; imageUrl: string; }, idx: number) => (
              <ProductCard key={product.id} product={{...product, imageUrl: product.imageUrl}} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section 
        className="py-16 bg-brand-dark"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-brand-purple bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="text-brand-purple text-xl" />
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Review Form */}
      <motion.section 
        className="py-16 bg-brand-dark"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">Share Your Experience</h2>
          <ReviewForm />
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <Newsletter />
      </motion.section>
    </>
  );
};

export default Home;
