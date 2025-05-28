import React from "react";
import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import type { Product } from "@shared/schema";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/products/${product.slug}`}>
      <motion.div 
        className="block bg-purple-900/20 backdrop-blur-lg border border-white/10 rounded-lg overflow-hidden shadow-glow group transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:bg-purple-900/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative h-48">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
          {product.discount && (
            <div className="absolute top-2 left-2 bg-purple-600/80 backdrop-blur-md text-white font-semibold text-xs py-1 px-2 rounded-full border border-white/10">-{product.discount}%</div>
          )}
        </div>
        <div className="p-4 bg-purple-900/10 backdrop-blur-md">
          <h3 className="text-lg font-bold mb-1">{product.name}</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {product.compatibility?.map((comp) => (
              <Badge key={comp} variant="outline" className="bg-purple-900/40 backdrop-blur-sm border border-purple-500/30 text-xs px-2 py-0.5 rounded-full">
                {comp}
              </Badge>
            ))}
          </div>
          <div className="flex justify-between items-center mt-4 p-2 rounded-lg bg-purple-950/40 backdrop-blur-md border border-white/5">
            <div className="flex items-center">
              <span className="text-lg font-bold text-white">${(product.price / 100).toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-gray-400 line-through text-sm ml-2">
                  ${(product.originalPrice / 100).toFixed(2)}
                </span>
              )}
            </div>
            <Button 
              variant="outline" 
              className="bg-purple-600/40 hover:bg-purple-600/60 p-2 rounded-full border border-white/20 transition-all duration-300 shadow-glow"
              onClick={handleAddToCart}
            >
              <ShoppingCart size={16} className="text-white" />
            </Button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
